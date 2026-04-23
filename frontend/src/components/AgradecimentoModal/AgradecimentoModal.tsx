import "./AgradecimentoModal.css"


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ThankYouModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="thankyou" >
      <div
        className="thankyou__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="thankyou__icon">🎉</div>

        <p className="thankyou__text">
          Obrigado pelo carinho 💛 <br /><br />
          Seu presente faz parte de um momento muito especial e será lembrado com <strong>muito amor</strong>.
        </p>

        <button className="thankyou__button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}