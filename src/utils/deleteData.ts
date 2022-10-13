import CollectionService from '../API/CollectionService';
import ItemService from '../API/ItemsService';
import UserService from '../API/UserService';

interface IDeletedItem {
  itemId?: string;
  collectionId?: string;
}

interface IDeletedCollection {
  collectionId?: string;
  userId?: string;
}

export const DeleteUser = async (userId: string) => {
  await UserService.deleteUser(String(userId));
  DeleteCollection({ userId: userId });
};

export const DeleteCollection = async ({
  userId,
  collectionId
}: IDeletedCollection) => {
  if (userId) {
    const collections = (await CollectionService.getCollections()).data.data;
    const deletedCollections = collections.filter(
      (collection) => collection.userId === userId
    );
    deletedCollections.forEach(({ id }) => {
      CollectionService.deleteCollection(String(id));
      DeleteItem({ collectionId: String(id) });
    });
  } else {
    await CollectionService.deleteCollection(String(collectionId));
    DeleteItem({ collectionId: String(collectionId) });
  }
};

export const DeleteItem = async ({ collectionId, itemId }: IDeletedItem) => {
  if (collectionId) {
    const items = (await ItemService.getItems()).data.data;
    const deletedItems = items.filter(
      (item) => item.collectionId === collectionId
    );
    deletedItems.forEach(({ id }) => ItemService.deleteItem(String(id)));
  }
  if (itemId) {
    await ItemService.deleteItem(itemId);
  }
};
