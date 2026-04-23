import "./AgradecimentoModal.css"


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ThankYouModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="thankyou" onClick={onClose}>
      <div
        className="thankyou__content"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="thankyou__text">
          Obrigado pelo carinho!! <br /><br />
          Seu presente significa muito para nós
          e fará parte da construção do nosso lar.
        </p>

        <button className="thankyou__button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}