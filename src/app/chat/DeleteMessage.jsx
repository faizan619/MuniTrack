import { getDatabase, ref, remove } from "firebase/database";
import toast from "react-hot-toast";

export const deleteMessage = async (messageId) => {
  const db = getDatabase();
  const messageRef = ref(db, `chat/${messageId}`);
  remove(messageRef)
    .then(() => {
      toast.remove();
      toast.success("Message Deleted Successfully !!");
      
    })
    .catch((error) => {
      toast.remove();
      toast.success("Error Deleting Message : ", error);
    });
};
