import { toast } from "sonner";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
    console.error(error);

    let title = "Something went wrong";
    let description = "Please try again later.";
    let action = undefined;

    if (error instanceof AxiosError) {
        if (error.code === "ERR_NETWORK") {
            title = "Connection Error";
            description = "Cannot reach the server. Is it running?";
            action = {
                label: "Retry",
                onClick: () => window.location.reload(),
            };
        } else if (error.response?.status === 500) {
            title = "Server Error";
            description = "The server reported an internal error. We've notified the team.";
        } else if (error.response?.status === 400) {
            title = "Invalid Request";
            description = "Please check your input and try again.";
        }
    }

    toast.error(title, {
        description,
        action,
        duration: 5000,
    });
};
