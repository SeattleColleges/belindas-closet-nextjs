import { Alert } from "@mui/material";

interface ErrorAlertProps {
  message: string;
}
const CustomErrorText: React.FC<ErrorAlertProps> = (props: ErrorAlertProps) => {
  return (
    <>
      <Alert severity="error">{props.message}</Alert>
    </>
  );
};

export default CustomErrorText;
