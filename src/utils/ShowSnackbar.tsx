import Swal from "sweetalert2";

interface SnackbarOptions {
  message: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  duration?: number;
  position?: "top-end" | "top-start" | "bottom-end" | "bottom-start" | "center";
}

export function showSnackbar({
  message,
  icon = "success",
  duration = 3000,
  position = "top-end",
}: SnackbarOptions) {
  Swal.fire({
    toast: true,
    position,
    icon,
    title: message,
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    customClass: {
      popup: "rounded-lg shadow-md",
    },
  });
}
