import "./Toast.css";

type Props = {
  message: string;
  type?: "success" | "error" | "info";
};

export function Toast({ message, type = "info" }: Props) {
  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}