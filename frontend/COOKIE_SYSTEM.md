# Sistema de Cookies e Termos - Crunchyroll Clone

## Visão Geral

Este sistema foi implementado para atender aos requisitos de conformidade com LGPD (Lei Geral de Proteção de Dados) e GDPR (General Data Protection Regulation). Inclui tanto o controle de cookies quanto a aceitação de termos de uso atualizados.

## Componentes

### 1. CookieBanner
- **Localização**: `src/app/components/modals/CookieBanner.tsx`
- **Função**: Banner que aparece na primeira visita do usuário
- **Características**:
  - Aparece na parte inferior da tela
  - Contém mensagem explicativa sobre o uso de cookies
  - Três botões: "Definições de Cookie", "Rejeitar Todos", "Aceitar Todos"
  - Responsivo para mobile e desktop

### 2. CookieSettingsModal
- **Localização**: `src/app/components/modals/CookieSettingsModal.tsx`
- **Função**: Modal para configurações detalhadas de cookies
- **Características**:
  - Categorias de cookies: Necessários, Analytics, Marketing, Preferências
  - Cookies necessários sempre ativos (não podem ser desativados)
  - Botões para aceitar/rejeitar todos rapidamente
  - Interface intuitiva com checkboxes

### 3. CookieSettingsButton
- **Localização**: `src/app/components/modals/CookieSettingsButton.tsx`
- **Função**: Botão reutilizável para abrir configurações de cookies
- **Uso**: Implementado no footer para acesso posterior às configurações

### 4. useCookieConsent Hook
- **Localização**: `src/app/[locale]/hooks/useCookieConsent.ts`
- **Função**: Hook personalizado para gerenciar estado e lógica de cookies
- **Funcionalidades**:
  - Verificar se usuário já deu consentimento
  - Salvar/carregar preferências do localStorage
  - Funções para aceitar/rejeitar todos os cookies
  - Reset de consentimento

### 5. TermsUpdateBanner
- **Localização**: `src/app/components/modals/TermsUpdateBanner.tsx`
- **Função**: Banner que aparece logo abaixo do header na primeira visita
- **Características**:
  - Aparece logo após o header
  - Contém título e mensagem sobre atualização de termos
  - Botão "Continuar" para aceitar os novos termos
  - Responsivo para mobile e desktop

### 6. TermsUpdateModal
- **Localização**: `src/app/components/modals/TermsUpdateModal.tsx`
- **Função**: Modal alternativo para atualização de termos
- **Características**:
  - Modal centralizado na tela
  - Mesma funcionalidade do banner, mas em formato modal
  - Pode ser usado como alternativa ao banner

### 7. useTermsAcceptance Hook
- **Localização**: `src/app/[locale]/hooks/useTermsAcceptance.ts`
- **Função**: Hook personalizado para gerenciar aceitação de termos
- **Funcionalidades**:
  - Verificar se usuário já aceitou os termos
  - Salvar aceitação no localStorage
  - Reset de aceitação para testes

### 8. HeaderWithTerms
- **Localização**: `src/app/components/layout/HeaderWithTerms.tsx`
- **Função**: Componente que combina header com banner de termos
- **Características**:
  - Renderiza o header seguido do banner de termos
  - Garante que o banner apareça logo abaixo do header

## Categorias de Cookies

### 1. Cookies Necessários
- **Sempre ativos**: Não podem ser desativados
- **Propósito**: Funcionamento básico do site
- **Exemplos**: Sessão, autenticação, carrinho de compras

### 2. Cookies de Analytics
- **Opcional**: Pode ser desativado pelo usuário
- **Propósito**: Análise de tráfego e comportamento do usuário
- **Exemplos**: Google Analytics, métricas de performance

### 3. Cookies de Marketing
- **Opcional**: Pode ser desativado pelo usuário
- **Propósito**: Publicidade personalizada e remarketing
- **Exemplos**: Facebook Pixel, Google Ads

### 4. Cookies de Preferências
- **Opcional**: Pode ser desativado pelo usuário
- **Propósito**: Personalização da experiência do usuário
- **Exemplos**: Idioma, tema, configurações de interface

## Implementação

### 1. Adicionar à página principal
```tsx
import HeaderWithTerms from "../components/layout/HeaderWithTerms";
import CookieBanner from "../components/modals/CookieBanner";

const HomePage = () => {
  return (
    <>
      <HeaderWithTerms />
      {/* Conteúdo da página */}
      <CookieBanner />
    </>
  );
};
```

### 2. Adicionar ao footer
```tsx
import CookieSettingsButton from '../modals/CookieSettingsButton';

const Footer = () => {
  return (
    <footer>
      {/* Outros links */}
      <CookieSettingsButton className="text-gray-600 hover:text-gray-800">
        Configurações de Cookies
      </CookieSettingsButton>
    </footer>
  );
};
```

### 3. Usar o hook em componentes
```tsx
import { useCookieConsent } from '../hooks/useCookieConsent';
import { useTermsAcceptance } from '../hooks/useTermsAcceptance';

const MyComponent = () => {
  const { hasConsented, preferences, acceptAll, rejectAll } = useCookieConsent();
  const { hasAcceptedTerms, acceptTerms } = useTermsAcceptance();

  // Verificar se analytics está ativo
  if (preferences.analytics) {
    // Carregar Google Analytics
  }

  // Verificar se termos foram aceitos
  if (!hasAcceptedTerms) {
    // Mostrar banner de termos
  }

  return (
    <div>
      {/* Conteúdo do componente */}
    </div>
  );
};
```

## Armazenamento

As preferências são salvas no `localStorage` com as seguintes chaves:

### Cookies
- `cookiesAccepted`: Boolean indicando se o usuário já deu consentimento
- `cookiePreferences`: JSON com as preferências detalhadas

```json
{
  "necessary": true,
  "analytics": false,
  "marketing": false,
  "preferences": true
}
```

### Termos
- `termsAccepted`: Boolean indicando se o usuário aceitou os novos termos

## Comportamento

### Primeira Visita
1. **Banner de Termos**: Aparece logo abaixo do header
   - Usuário deve clicar em "Continuar" para aceitar os novos termos
   - Modal não pode ser fechado sem aceitar

2. **Banner de Cookies**: Aparece na parte inferior da tela
   - Usuário pode escolher entre:
     - Aceitar todos os cookies
     - Rejeitar todos os cookies (exceto necessários)
     - Abrir configurações detalhadas

### Visitas Subsequentes
- **Termos**: Banner não aparece se o usuário já aceitou
- **Cookies**: Banner não aparece se o usuário já deu consentimento
- Preferências são carregadas automaticamente
- Usuário pode alterar configurações através do footer

### Reset de Consentimento
- **Termos**: Use a função `resetTermsAcceptance()` do hook ou limpe o localStorage
- **Cookies**: Use a função `resetConsent()` do hook ou limpe o localStorage
- Banners reaparecerão na próxima visita

## Responsividade

- **Desktop**: Banner com layout horizontal (mensagem à esquerda, botões à direita)
- **Mobile**: Layout vertical empilhado para melhor usabilidade
- **Modal**: Responsivo com scroll interno para telas menores

## Acessibilidade

- Navegação por teclado suportada
- Labels semânticos para screen readers
- Contraste adequado para leitura
- Foco visível nos elementos interativos

## Conformidade Legal

Este sistema atende aos requisitos básicos de:
- **LGPD (Brasil)**: Consentimento explícito e granular
- **GDPR (UE)**: Direito de escolha e controle
- **CCPA (Califórnia)**: Transparência sobre coleta de dados

## Personalização

### Cores e Estilo
As cores e estilos podem ser personalizados através das classes Tailwind CSS nos componentes.

### Mensagens
As mensagens podem ser traduzidas usando o sistema de internacionalização (i18n) do Next.js.

### Categorias
Novas categorias de cookies podem ser adicionadas editando a interface `CookiePreferences` e os componentes correspondentes. 