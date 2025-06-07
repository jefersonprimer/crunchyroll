import React from 'react';

const Footer: React.FC = () => {
  return (
    <div id="footer_menu" className="flex flex-col gap-8 bg-[#F3F3F3] p-[40px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-[1280px]">
        <div className="hidden md:block">
          <h6 className="text-[11px] font-bold mb-1 text-[#777777]">Séries Mais Vistas</h6>
          <ul>
            <li><a href="/dragon-ball-super" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Dragon Ball Super</a></li>
            <li><a href="/one-piece" className="text-[11px] text-[#888888] hover:text-[#F78C25]">One Piece</a></li>
            <li><a href="/the-ancient-magus-bride" className="text-[11px] text-[#888888] hover:text-[#F78C25]">The Ancient Magus' Bride</a></li>
            <li><a href="/food-wars-shokugeki-no-soma" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Food Wars! Shokugeki no Soma</a></li>
            <li><a href="/boruto-naruto-next-generations" className="text-[11px] text-[#888888] hover:text-[#F78C25]">BORUTO: NARUTO NEXT GENERATIONS</a></li>
            <li><a href="/naruto-shippuden" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Naruto Shippuden</a></li>
            <li><a href="/black-clover" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Black Clover</a></li>
            <li><a href="/gintama" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Gintama</a></li>
          </ul>
        </div>

        <div className="hidden md:block">
          <h6 className="text-[11px] font-weight-700 mb-4 text-[#777777]">Plataformas e Aparelhos</h6>
          <ul className="space-y-2">
            <li><a href="/devices#chromecast" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Chromecast</a></li>
            <li><a href="/devices#xboxone" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Xbox One</a></li>
            <li><a href="/devices#ps4" className="text-[11px] text-[#888888] hover:text-[#F78C25]">PlayStation 4</a></li>
            <li><a href="/devices#ios" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Apple iOS</a></li>
            <li><a href="/devices#android" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Android</a></li>
            <li><a href="/devices#appletv" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Apple TV</a></li>
            <li><a href="/devices#roku" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Roku Box</a></li>
            <li><a href="/devices#firetv" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Fire TV</a></li>
          </ul>
        </div>

        <div>
          <h6 className="text-[11px] font-bold mb-1 text-[#777777]">Assinaturas Premium</h6>
          <ul>
            <li>
              <a href="/premium?from=bottombar&return_url=https://www.crunchyroll.com/simulcastcalendar?date%3D2025-06-02%26filter%3Dpremium#plans" 
                 className="text-[11px] text-[#888888] hover:text-[#F78C25]">
                Teste Gratuito de Duas Semanas
              </a>
            </li>
            <li>
              <a href="https://store.crunchyroll.com/collections/membership?src=bottombar" 
                 className="text-[11px] text-[#888888] hover:text-[#F78C25]">
                Comprar Assinaturas de Presente
              </a>
            </li>
            <li>
              <a href="/redeem" className="text-[11px] text-[#888888] hover:text-[#F78C25]">
                Ativar Cartão-Presente da Crunchyroll/VRV
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-[11px] font-bold mb-1 flex items-center gap-2 text-[#777777]">
            Idioma
            <img 
              id="footer_country_flag" 
              src="https://www.crunchyroll.com/i/country_flags/br.gif" 
              alt="Brazil" 
              title="Your detected location is Brazil."
              className="w-6 h-4"
            />
          </h6>
          <ul>
            <li><a href="/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">English (US)</a></li>
            <li><a href="/es/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Español (América Latina)</a></li>
            <li><a href="/es-es/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Español (España)</a></li>
            <li><a href="/pt-br/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25] font-medium">Português (Brasil)</a></li>
            <li><a href="/pt-pt/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Português (Portugal)</a></li>
            <li><a href="/fr/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Français (France)</a></li>
            <li><a href="/de/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Deutsch</a></li>
            <li><a href="/ar/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">العربية</a></li>
            <li><a href="/it/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Italiano</a></li>
            <li><a href="/ru/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Русский</a></li>
            <li><a href="/hi/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">हिन्द</a></li>
            <li><a href="/id/simulcastcalendar?filter=premium&date=2025-06-02" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Bahasa Indonesia</a></li>
          </ul>
        </div>

        <div>
          <h6 className="text-[11px] font-bold mb-1 text-[#777777]">Suporte</h6>
          <ul>
            <li>
              <a href="https://crunchyroll.zendesk.com/hc" 
                 className="text-[11px] text-[#888888] hover:text-[#F78C25]">
                Ajuda/FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-[11px] font-bold mb-1 text-[#777777]">Crunchyroll</h6>
          <ul>
            <li><a href="/pt-br/about/" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Sobre</a></li>
            <li><a href="/about/jobs/index.html" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Trabalhe Conosco</a></li>
            <li><a href="/advertising" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Publicidade</a></li>
            <li><a href="/dmca_policy" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Política de Direitos Autorais</a></li>
            <li><a href="/tos" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Termos de Serviço</a></li>
            <li><a href="/privacy" className="text-[11px] text-[#888888] hover:text-[#F78C25]">Política de Privacidade</a></li>
            <li>
              <button 
                id="ot-sdk-btn" 
                className="text-[11px] text-[#888888] hover:text-[#F78C25]"
              >
                Ferramenta de Consentimento de Cookies
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t pt-8">
      <div className="flex items-center gap-8">
          <img 
            src="https://www.crunchyroll.com/i/sony-pictures-logo.png" 
            srcSet="https://www.crunchyroll.com/i/sony-pictures-logo@2x.png 2x, https://www.crunchyroll.com/i/sony-pictures-logo@3x.png 3x"
            alt="Sony Pictures Logo"
            className="w-[158px] h-[12px]"
          />
        </div>
        <div className="flex gap-4">
          <a href="/feed" className="flex items-center gap-2 text-[11px] text-[#888888] hover:text-[#F78C25]">
            <img 
              className="w-6 h-6" 
              src="https://www.crunchyroll.com/i/rss.png" 
              alt="rss"
            />
            RSS
          </a>
          <a 
            href="https://twitter.com/crunchyroll_pt" 
            className="text-[11px] text-[#888888] hover:text-[#F78C25]"
          >
            Follow @crunchyroll_pt
          </a>
          <div className="fb-like" 
               data-href="https://www.facebook.com/Crunchyroll.pt" 
               data-layout="button_count" 
               data-action="like" 
               data-show-faces="true" 
               data-share="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;