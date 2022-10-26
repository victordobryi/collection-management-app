import CollectionService from '../API/CollectionService';
import CommentService from '../API/CommentService';
import ItemService from '../API/ItemsService';
import LikeService from '../API/LikeService';
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
      (data) => data.collectionId === collectionId
    );
    deletedItems.forEach((data) => ItemService.deleteItem(String(data.id)));
  }
  if (itemId) {
    await ItemService.deleteItem(itemId);
  }
  DeleteLikes(String(itemId));
  DeleteComments(String(itemId));
};

export const DeleteLikes = async (itemId: string) => {
  const likes = (await LikeService.getItems()).data.data;
  const deletedLikes = likes.filter(({ postId }) => postId === itemId);
  deletedLikes.forEach(({ id }) => LikeService.deleteItem(String(id)));
};

export const DeleteComments = async (itemId: string) => {
  const comments = (await CommentService.getComments()).data.data;
  const deletedComments = comments.filter(
    ({ toItemId }) => toItemId === itemId
  );
  deletedComments.forEach(({ id }) => CommentService.deleteComment(String(id)));
};
