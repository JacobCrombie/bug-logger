import Swal from "sweetalert2"

export default class NotificationService {

  static async confirmAction(title = "Are you sure", text = "You won't be able to undo this!", confirmButtonText = "Yes, delete it!", confirmButtonColor = "blue") {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: 'red',
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Oops Nevermind'
      })
      if (res.value) {
        return true
      }
      return false
    } catch (error) {
      console.error(error);
    }
  }
}