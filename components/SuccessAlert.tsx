import { Alert } from "@mui/material";

interface SuccessAlertProps {
  message: string;
}

const SuccessAlert: React.FC<SuccessAlertProps> = (
  props: SuccessAlertProps
) => {
  return (
    <>
      <Alert severity="success">{props.message}</Alert>
    </>
  );
};

export default SuccessAlert;