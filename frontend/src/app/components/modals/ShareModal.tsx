import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-[1000] bg-[#23252B]/60">
      <div className="bg-[#23252B] text-white shadow-xl max-w-[720px] max-h-[394px] w-full h-auto overflow-hidden relative">
        <button
          className="absolute top-4 right-4 text-white text-2xl bg-transparent border-none cursor-pointer"
          onClick={onClose}
          aria-label="Fechar"
        >
            <svg 
                className="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                data-t="cross-svg" 
                aria-hidden="true" 
                role="img"
                fill="currentColor"
            >
                <path d="M13.414 12l5.293-5.293a.999.999 0 1 0-1.414-1.414L12 10.586 6.707 5.293a.999.999 0 1 0-1.414 1.414L10.586 12l-5.293 5.293a.999.999 0 0 0 0 1.414.993.993 0 0 0 1.414 0L12 13.414l5.293 5.293a.999.999 0 1 0 1.414-1.414L13.414 12z">
                </path>
            </svg>
        </button>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Compartilhe Esta Série
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <a
              aria-label="Compartilhe este show em E-mail"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100"
              href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700 mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <g fill="none" fillRule="evenodd">
                    <rect width="64" height="64" fill="#59595B" rx="32"></rect>
                    <path fill="#FFF" d="M44 20H20c-1.656 0-3 1.344-3 3v18c0 1.656 1.344 3 3 3h24c1.656 0 3-1.344 3-3V23c0-1.656-1.344-3-3-3zm0 7.05l-12 8.001-12-8.001v-3.605l12 8 12-8v3.605z"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold">E-mail</span>
            </a>

            {/* X (Twitter) Share Option */}
            <button
              aria-label="Compartilhe este show em X"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-black mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <rect width="64" height="64" rx="32" fill="black"></rect>
                  <path d="M34.74 29.7948L45.4615 17.6H42.9208L33.6114 28.1886L26.176 17.6H17.6001L28.8439 33.6118L17.6001 46.4H20.1409L29.9719 35.2181L37.8242 46.4H46.4001L34.7394 29.7948H34.74ZM31.2601 33.7529L30.1208 32.1585L21.0564 19.4715H24.9589L32.274 29.7103L33.4132 31.3047L42.922 44.6136H39.0195L31.2601 33.7535V33.7529Z" fill="white"></path>
                </svg>
              </span>
              <span className="text-sm font-semibold">X</span>
            </button>

            {/* Facebook Share Option */}
            <button
              aria-label="Compartilhe este show em Facebook"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#3C5A9A] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="facebook-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="facebook-logo-b" fill="#fff"><use href="#facebook-logo-a"></use></mask>
                    <circle cx="32" cy="32" r="32" fill="#3C5A9A" fillRule="nonzero" mask="url(#facebook-logo-b)"></circle>
                    <path fill="#FFF" fillRule="nonzero" d="M39.976 15h-5.434c-3.225 0-6.811 1.356-6.811 6.03.015 1.63 0 3.189 0 4.944H24v5.937h3.846V49h7.067V31.798h4.665l.422-5.84h-5.208s.011-2.598 0-3.353c0-1.847 1.922-1.741 2.037-1.741.915 0 2.693.003 3.15 0V15h-.003z" mask="url(#facebook-logo-b)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold">Facebook</span>
            </button>

            {/* Reddit Share Option */}
            <button
              aria-label="Compartilhe este show em Reddit"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FF4500] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="reddit-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="reddit-logo-b" fill="#fff"><use href="#reddit-logo-a"></use></mask>
                    <use fill="#D8D8D8" href="#reddit-logo-a"></use>
                    <g fillRule="nonzero" mask="url(#reddit-logo-b)"><circle cx="32" cy="32" r="32" fill="#FF4500"></circle><path fill="#FFF" d="M52 32.319c0-2.445-1.968-4.43-4.394-4.43-1.195 0-2.25.461-3.023 1.24-2.987-2.16-7.135-3.578-11.704-3.755l2.003-9.46 6.503 1.381c.07 1.666 1.441 3.012 3.128 3.012 1.723 0 3.128-1.417 3.128-3.153 0-1.737-1.405-3.154-3.128-3.154-1.23 0-2.285.709-2.777 1.772l-7.276-1.56c-.21-.035-.421 0-.597.107-.176.106-.281.283-.352.496l-2.214 10.559c-4.675.142-8.858 1.524-11.88 3.756-.774-.744-1.863-1.24-3.023-1.24-2.426 0-4.394 1.984-4.394 4.429 0 1.807 1.054 3.33 2.601 4.04-.07.424-.105.885-.105 1.346 0 6.803 7.838 12.295 17.54 12.295 9.7 0 17.539-5.492 17.539-12.295 0-.46-.035-.886-.106-1.311C50.91 35.685 52 34.126 52 32.319zm-30.053 3.153c0-1.736 1.406-3.153 3.129-3.153 1.722 0 3.128 1.417 3.128 3.153 0 1.737-1.406 3.154-3.128 3.154-1.723 0-3.129-1.417-3.129-3.154zm17.47 8.327c-2.145 2.162-6.222 2.303-7.417 2.303-1.195 0-5.308-.177-7.417-2.303-.316-.319-.316-.85 0-1.17.317-.318.844-.318 1.16 0 1.336 1.347 4.218 1.843 6.292 1.843s4.921-.496 6.292-1.842c.316-.319.843-.319 1.16 0 .246.354.246.85-.07 1.17zm-.563-5.173c-1.722 0-3.128-1.417-3.128-3.154 0-1.736 1.406-3.153 3.128-3.153 1.722 0 3.128 1.417 3.128 3.153 0 1.737-1.406 3.154-3.128 3.154z"></path></g>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibol">Reddit</span>
            </button>

            {/* Pinterest Share Option */}
            <button
              aria-label="Compartilhe este show em Pinterest"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#CA3737] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="pinterest-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="pinterest-logo-b" fill="#fff"><use href="#pinterest-logo-a"></use></mask>
                    <circle cx="32" cy="32" r="32" fill="#CA3737" fillRule="nonzero" mask="url(#pinterest-logo-b)"></circle>
                    <path fill="#FFF" fillRule="nonzero" d="M32 16.133c-8.8 0-15.867 7.067-15.867 15.867 0 6.533 3.867 12 9.467 14.533 0-1.066 0-2.4.267-3.6.266-1.333 2-8.666 2-8.666s-.534-1.067-.534-2.534c0-2.4 1.334-4.133 3.067-4.133 1.467 0 2.133 1.067 2.133 2.4 0 1.467-.933 3.6-1.333 5.6-.4 1.733.933 3.067 2.533 3.067 3.067 0 5.067-3.867 5.067-8.4 0-3.467-2.4-6-6.533-6-4.8 0-7.734 3.6-7.734 7.6 0 1.333.4 2.4 1.067 3.066.267.4.4.534.267.934-.134.266-.267.933-.267 1.333-.133.4-.4.533-.8.4-2.267-.933-3.2-3.333-3.2-6 0-4.533 3.733-9.867 11.333-9.867 6 0 10 4.4 10 9.067 0 6.267-3.466 10.8-8.533 10.8-1.733 0-3.333-.933-3.867-2 0 0-.933 3.6-1.066 4.4-.4 1.2-.934 2.4-1.6 3.333 1.466.4 2.933.667 4.533.667 8.8 0 15.867-7.067 15.867-15.867-.4-8.933-7.467-16-16.267-16z" mask="url(#pinterest-logo-b)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold">Pinterest</span>
            </button>

            {/* Tumblr Share Option */}
            <button
              aria-label="Compartilhe este show em Tumblr"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#314358] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="tumblr-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="tumblr-logo-b" fill="#fff"><use href="#tumblr-logo-a"></use></mask>
                    <path fill="#314358" fillRule="nonzero" d="M0 0h64v64H0z" mask="url(#tumblr-logo-b)"></path>
                    <path fill="#FFF" fillRule="nonzero" d="M39.494 41.56c-.583.284-1.696.531-2.527.552-2.507.069-2.994-1.8-3.014-3.153v-9.962h6.29v-4.845h-6.268V16h-4.587c-.075 0-.207.068-.226.239-.268 2.495-1.41 6.873-6.162 8.624v4.134h3.17v10.455c0 3.58 2.584 8.666 9.407 8.546 2.302-.04 4.858-1.025 5.423-1.875l-1.506-4.563" mask="url(#tumblr-logo-b)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold">Tumblr</span>
            </button>

            {/* WhatsApp Share Option */}
            <button
              aria-label="Compartilhe este show em WhatsApp"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#43C553] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><linearGradient id="whats-app-logo-c" x1="50%" x2="50%" y1="100%" y2="0%"><stop offset="0%" stopColor="#20B038"></stop><stop offset="100%" stopColor="#60D66A"></stop></linearGradient><rect id="whats-app-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="whats-app-logo-b" fill="#fff"><use href="#whats-app-logo-a"></use></mask>
                    <use fill="#43C553" href="#whats-app-logo-a"></use>
                    <path fill="#E0E0E0" fillRule="nonzero" d="M46.172 17.813c-3.76-3.746-8.76-5.81-14.088-5.813-10.978 0-19.912 8.891-19.917 19.82-.001 3.493.916 6.903 2.659 9.91L12 52l10.558-2.756c2.909 1.58 6.184 2.411 9.517 2.413h.009c10.976 0 19.911-8.893 19.916-19.821.002-5.297-2.068-10.277-5.828-14.023zM32.084 48.309h-.007c-2.97-.001-5.884-.795-8.425-2.297l-.605-.356-6.265 1.635 1.673-6.08-.394-.623c-1.658-2.623-2.532-5.654-2.531-8.767.003-9.083 7.429-16.473 16.56-16.473 4.422.002 8.578 1.717 11.703 4.831 3.126 3.114 4.845 7.253 4.844 11.656-.004 9.083-7.43 16.474-16.553 16.474z" mask="url(#whats-app-logo-b)"></path>
                    <path fill="url(#whats-app-logo-c)" fillRule="nonzero" d="M12.914 50.86l2.697-9.801c-1.664-2.869-2.539-6.123-2.538-9.457.005-10.429 8.53-18.914 19.006-18.914 5.085.003 9.857 1.973 13.445 5.548 3.588 3.575 5.564 8.327 5.561 13.381-.004 10.43-8.53 18.915-19.005 18.915h-.008c-3.181 0-6.306-.796-9.082-2.302l-10.076 2.63z" mask="url(#whats-app-logo-b)"></path>
                    <path fill="#FFF" d="M27.162 23.405c-.368-.815-.756-.832-1.107-.846-.287-.012-.615-.011-.943-.011-.328 0-.86.122-1.311.612-.451.49-1.722 1.675-1.722 4.085s1.763 4.738 2.008 5.065c.246.326 3.404 5.429 8.404 7.392 4.155 1.63 5 1.306 5.903 1.225.902-.082 2.91-1.185 3.32-2.328.41-1.144.41-2.124.287-2.329-.123-.204-.45-.326-.943-.57-.492-.246-2.91-1.43-3.361-1.594-.451-.163-.78-.245-1.107.245-.328.49-1.27 1.593-1.557 1.92-.287.327-.574.368-1.066.123-.492-.246-2.077-.763-3.956-2.43-1.463-1.299-2.45-2.902-2.737-3.392-.287-.49-.03-.755.216-1 .221-.219.492-.571.738-.857.246-.286.328-.49.492-.817.164-.327.082-.613-.041-.858-.123-.244-1.08-2.666-1.517-3.635z" mask="url(#whats-app-logo-b)"></path>
                    <path fill="#FFF" fillRule="nonzero" d="M45.78 17.746c-3.718-3.703-8.66-5.744-13.927-5.746-10.852 0-19.683 8.79-19.688 19.592-.001 3.454.905 6.825 2.628 9.796L12 51.54l10.437-2.725c2.875 1.562 6.113 2.384 9.408 2.386h.008c10.85 0 19.683-8.791 19.688-19.594.002-5.235-2.044-10.158-5.761-13.862zM31.853 47.892h-.006c-2.937-.001-5.817-.786-8.329-2.27l-.598-.353-6.193 1.617 1.653-6.01-.39-.616c-1.637-2.593-2.502-5.59-2.5-8.666.003-8.98 7.343-16.285 16.37-16.285 4.37.002 8.478 1.698 11.568 4.776s4.79 7.17 4.789 11.522c-.004 8.98-7.345 16.285-16.364 16.285z" mask="url(#whats-app-logo-b)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold">WhatsApp</span>
            </button>

            {/* Telegram Share Option */}
            <button
              aria-label="Compartilhe este show em Telegram"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2AABEE] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><linearGradient id="telegram-logo-b" x1="50%" x2="50%" y1="0%" y2="99.258%"><stop offset="0%" stopColor="#2AABEE"></stop><stop offset="100%" stopColor="#229ED9"></stop></linearGradient><rect id="telegram-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="telegram-logo-c" fill="#fff"><use href="#telegram-logo-a"></use></mask>
                    <circle cx="32" cy="32" r="32" fill="url(#telegram-logo-b)" fillRule="nonzero" mask="url(#telegram-logo-c)"></circle>
                    <path fill="#FFF" fillRule="nonzero" d="M14.485 31.662c9.329-4.064 15.55-6.744 18.662-8.038 8.886-3.696 10.733-4.339 11.937-4.36.264-.004.856.061 1.24.372.323.263.412.618.455.867.043.249.096.816.054 1.26-.482 5.06-2.566 17.339-3.626 23.006-.448 2.398-1.332 3.202-2.187 3.28-1.858.172-3.27-1.227-5.07-2.407-2.815-1.846-4.407-2.996-7.14-4.797-3.16-2.082-1.112-3.227.689-5.097.471-.489 8.659-7.936 8.817-8.612.02-.084.038-.4-.149-.566-.187-.166-.463-.11-.662-.064-.283.064-4.782 3.038-13.498 8.922-1.277.877-2.434 1.304-3.47 1.281-1.143-.024-3.34-.646-4.975-1.177-2.004-.651-3.596-.996-3.458-2.102.073-.576.866-1.165 2.381-1.768z" mask="url(#telegram-logo-c)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold">Telegram</span>
            </button>

            {/* Line Share Option */}
            <button
              aria-label="Compartilhe este show em Line"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#3ACE01] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="line-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="line-logo-b" fill="#fff"><use href="#line-logo-a"></use></mask>
                    <path fill="#3ACE01" d="M13.099 0H50.9C58.106 0 64 5.894 64 13.099V50.9C64 58.106 58.106 64 50.901 64H13.1C5.894 64 0 58.106 0 50.901V13.1C0 5.894 5.894 0 13.099 0z" mask="url(#line-logo-b)"></path>
                    <path fill="#FFF" d="M31.938 10.602c12.968 0 23.48 8.417 23.48 18.801 0 3.627-1.283 7.014-3.505 9.886-.11.164-.254.344-.435.544l-.014.015c-.759.908-1.613 1.76-2.553 2.547-6.493 6.002-17.181 13.147-18.592 12.045-1.226-.958 2.02-5.645-1.725-6.425-.261-.03-.522-.062-.78-.1h-.005C16.81 46.353 8.458 38.66 8.458 29.403c0-10.384 10.512-18.801 23.48-18.801z" mask="url(#line-logo-b)"></path>
                    <path fill="#3ACE01" d="M18.315 35.4h4.735c.674 0 1.225-.55 1.225-1.224v-.102c0-.674-.551-1.225-1.225-1.225h-3.409v-7.756c0-.673-.55-1.224-1.224-1.224h-.102c-.674 0-1.225.55-1.225 1.224v9.083c0 .674.551 1.225 1.225 1.225zm29.344-5.692v-.102c0-.674-.551-1.225-1.225-1.225h-3.409v-1.939h3.409c.674 0 1.225-.551 1.225-1.225v-.102c0-.673-.551-1.224-1.225-1.224h-4.736c-.673 0-1.224.55-1.224 1.224v9.083c0 .673.55 1.224 1.224 1.224h4.736c.674 0 1.225-.55 1.225-1.224v-.103c0-.673-.551-1.224-1.225-1.224h-3.409v-1.94h3.409c.674.001 1.225-.55 1.225-1.223zm-9.107 5.328v-.001c.227-.228.354-.537.354-.859v-9.082c0-.674-.55-1.225-1.225-1.225h-.102c-.673 0-1.224.551-1.224 1.225v5.331l-4.427-5.937c-.211-.369-.61-.619-1.063-.619h-.102c-.674 0-1.225.551-1.225 1.225v9.082c0 .674.551 1.225 1.225 1.225h.102c.674 0 1.225-.551 1.225-1.225v-5.431l4.458 6.089c.027.043.057.084.09.123.122.167.29.282.476.351.144.06.3.093.465.093h.102c.2 0 .396-.05.572-.143.123-.059.226-.134.299-.222zm-12.064.365h.102c.673 0 1.224-.551 1.224-1.225v-9.082c0-.674-.55-1.225-1.224-1.225h-.102c-.674 0-1.225.551-1.225 1.225v9.082c0 .674.551 1.225 1.225 1.225z" mask="url(#line-logo-b)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold ">Line</span>
            </button>

            {/* Vkontakte Share Option */}
            <button
              aria-label="Compartilhe este show em Vkontakt"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#2787F5] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="v-kontakte-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="v-kontakte-logo-b" fill="#fff"><use href="#v-kontakte-logo-a"></use></mask>
                    <path fill="#2787F5" fillRule="nonzero" d="M0 30.667C0 16.21 0 8.982 4.491 4.49S16.211 0 30.667 0h2.666C47.79 0 55.018 0 59.51 4.491S64 16.211 64 30.667v2.666c0 14.457 0 21.685-4.491 26.176S47.789 64 33.333 64h-2.666C16.21 64 8.982 64 4.49 59.509S0 47.789 0 33.333v-2.666z" mask="url(#v-kontakte-logo-b)"></path>
                    <path fill="#FFF" d="M17.876 20H13.5c-1.25 0-1.5.595-1.5 1.25 0 1.171 1.484 6.98 6.908 14.66 3.616 5.246 8.71 8.09 13.347 8.09 2.781 0 3.125-.632 3.125-1.72v-3.964c0-1.263.264-1.515 1.145-1.515.649 0 1.761.327 4.358 2.857C43.85 42.655 44.339 44 46.008 44h4.376c1.25 0 1.875-.632 1.515-1.878-.395-1.242-1.812-3.045-3.691-5.18-1.02-1.219-2.55-2.53-3.014-3.186-.649-.843-.463-1.218 0-1.967 0 0 5.332-7.588 5.888-10.164.278-.937 0-1.625-1.323-1.625h-4.376c-1.113 0-1.626.595-1.904 1.25 0 0-2.225 5.48-5.378 9.04-1.02 1.03-1.484 1.358-2.04 1.358-.278 0-.68-.328-.68-1.264v-8.759c0-1.124-.324-1.625-1.25-1.625h-6.878c-.695 0-1.113.522-1.113 1.016 0 1.066 1.576 1.312 1.739 4.31v6.51c0 1.427-.256 1.686-.812 1.686-1.483 0-5.092-5.505-7.232-11.803-.42-1.224-.84-1.719-1.959-1.719z" mask="url(#v-kontakte-logo-b)"></path>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold ">Vkontakt</span>
            </button>

            {/* OK.RU Share Option */}
            <button
              aria-label="Compartilhe este show em OK.RU"
              tabIndex={0}
              className="flex flex-col items-center p-3 rounded-lg  transition-colors duration-200 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <span className="w-16 h-16 flex items-center justify-center rounded-full bg-[#EE8208] mb-2">
                <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" role="img">
                  <defs><rect id="odnoklassniki-logo-a" width="64" height="64" x="0" y="0" rx="32"></rect></defs>
                  <g fill="none" fillRule="evenodd">
                    <mask id="odnoklassniki-logo-b" fill="#fff"><use href="#odnoklassniki-logo-a"></use></mask>
                    <circle cx="32" cy="32" r="32" fill="#EE8208" fillRule="nonzero" mask="url(#odnoklassniki-logo-b)"></circle>
                    <g fill="#FFF" fillRule="nonzero" mask="url(#odnoklassniki-logo-b)"><path d="M32 32.621c5.274 0 9.57-4.296 9.57-9.57s-4.295-9.57-9.569-9.57-9.57 4.296-9.57 9.57 4.296 9.57 9.57 9.57m0-13.54c2.193 0 3.97 1.778 3.97 3.97 0 2.193-1.777 3.97-3.97 3.97-2.192 0-3.97-1.777-3.97-3.97 0-2.192 1.778-3.97 3.97-3.97m3.881 21.333c1.955-.444 3.822-1.214 5.57-2.31 1.304-.83 1.719-2.549.889-3.882-.83-1.304-2.548-1.719-3.881-.89-3.912 2.46-8.978 2.46-12.89 0-1.303-.829-3.051-.444-3.88.89-.83 1.303-.445 3.052.888 3.881 1.719 1.097 3.615 1.867 5.57 2.311l-5.363 5.363c-1.096 1.097-1.096 2.874 0 3.97.563.534 1.275.83 1.986.83.71 0 1.452-.266 1.985-.83l5.274-5.273 5.274 5.274c1.096 1.096 2.874 1.096 3.97 0 1.097-1.097 1.097-2.874 0-3.97l-5.392-5.364z"></path></g>
                  </g>
                </svg>
              </span>
              <span className="text-sm font-semibold ">OK.RU</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;