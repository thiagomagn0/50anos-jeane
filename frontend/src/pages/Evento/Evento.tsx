import "./Evento.css";



export default function Evento() {

 const openWaze = () => {
    const appUrl = "waze://?q=Av.+Boa+Esperança,+Salvador";
    const fallback = "https://waze.com/ul?q=Av.+Boa+Esperança,+Salvador&navigate=yes";

    window.location.href = appUrl;

    setTimeout(() => {
      window.open(fallback, "_blank");
    }, 800);
  };

  return (
    <div className="evento fade-page">
      <div className="evento__container">

        <h1 className="evento__title">Local do Evento</h1>

       <p className="evento__subtitle">
        Confira o endereço e como chegar ao evento
      </p>

        <div className="evento__card">
        <p className="evento__address">
          Rua Parambu, Res. Monte Carlo <br />
          Santa Tereza Nº 131 <br />
          Salvador - BA <br />
          CEP: 40261-015
        </p>

          <iframe
            className="evento__map"
            src="https://www.google.com/maps?q=Residencial+Monte+Carlo,+R.+Parambu,+131+-+Santa+Teresa,+Salvador+-+BA,+40261-015&output=embed"
            loading="lazy"
          />
       <div className="evento__actions">

  <a
    href="https://www.google.com/maps?q=Residencial+Monte+Carlo,+R.+Parambu,+131+-+Santa+Teresa,+Salvador+-+BA,+40261-015"
    target="_blank"
    className="evento__button"
  >
    
    Abrir no Google Maps
    <img src="/images/google_maps.png" className="evento__icon-img" />
  </a>

  <a
    onClick={openWaze}
    className="evento__button evento__button--waze"
  >
    
    Abrir no Waze
    <img src="/images/waze.png" className="evento__icon-img" />
  </a>

</div>
        </div>

      </div>
    </div>
  );
}