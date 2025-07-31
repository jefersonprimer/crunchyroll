# Sistema de Múltiplas Contas - Crunchyroll

Este documento explica como funciona o sistema de múltiplas contas implementado no frontend da aplicação Crunchyroll.

## Visão Geral

O sistema de múltiplas contas permite que os usuários:
- Façam login com diferentes contas
- Alternem entre contas salvas
- Mantenham suas sessões separadas
- Gerenciem suas contas através de uma interface intuitiva

## Como Funciona

### 1. Armazenamento Local
- As contas são armazenadas no `localStorage` do navegador
- Cada conta inclui: dados do usuário, token JWT, data de último login
- A conta atual é marcada separadamente para facilitar a troca

### 2. Chaves de Armazenamento
```javascript
const STORAGE_KEY = 'crunchyroll_accounts';           // Lista de todas as contas
const CURRENT_ACCOUNT_KEY = 'crunchyroll_current_account'; // Conta ativa
```

### 3. Estrutura de Dados
```typescript
interface StoredAccount {
  id: string;
  email: string;
  username: string;
  display_name: string;
  profile_image_url: string | null;
  background_image_url: string | null;
  token: string;
  lastLoginAt: string;
  createdAt: string;
}
```

## Componentes Principais

### 1. Hook `useMultipleAccounts`
Localização: `src/app/[locale]/hooks/useMultipleAccounts.ts`

Funcionalidades:
- `addAccount(userProfile, token)`: Adiciona nova conta
- `removeAccount(accountId)`: Remove conta
- `switchAccount(accountId)`: Troca para outra conta
- `getCurrentAccount()`: Retorna conta atual
- `clearAllAccounts()`: Remove todas as contas
- `logoutCurrentAccount()`: Desloga apenas a conta atual (mantém outras)

### 2. Contexto `MultipleAccountsContext`
Localização: `src/app/[locale]/contexts/MultipleAccountsContext.tsx`

Fornece acesso global ao sistema de múltiplas contas através do React Context.

### 3. Página de Seleção de Perfis
Localização: `src/app/[locale]/profile-selection/`

Interface para:
- Visualizar todas as contas salvas
- Trocar entre contas
- Adicionar novas contas
- Remover contas existentes
- **Background dinâmico**: Mostra a imagem de fundo do perfil atual
- **Indicador visual**: Mostra qual conta está ativa no header
- **Transições suaves**: Animações ao trocar entre contas

## Integração com Sistema Existente

### 1. Login/Registro
Os hooks `useLogin` e `useRegister` foram atualizados para:
- Adicionar automaticamente novas contas ao sistema
- Manter compatibilidade com o sistema de autenticação existente

### 2. AccountModal
O modal de conta foi atualizado para incluir link para a página de seleção de perfis.

### 3. AccountIndicator
Novo componente que mostra a conta atual no header.

## Fluxo de Uso

### 1. Primeiro Login
1. Usuário faz login normalmente
2. Conta é automaticamente adicionada ao sistema
3. Usuário é redirecionado para a home

### 2. Login com Nova Conta
1. Usuário acessa `/profile-selection`
2. Clica em "Adicionar Perfil"
3. Sistema desloga automaticamente a conta atual
4. Usuário é redirecionado para `/login`
5. Faz login com nova conta
6. Nova conta é adicionada ao sistema

### 3. Troca de Conta
1. Usuário acessa `/profile-selection`
2. Clica na conta desejada
3. Sistema troca automaticamente para a conta selecionada
4. **Background muda dinamicamente** para a imagem do perfil selecionado
5. Usuário é redirecionado para a home

### 4. Remoção de Conta
1. Usuário acessa `/profile-selection`
2. Hover sobre a conta desejada
3. Clica no botão "×" (remover)
4. Confirma a remoção no modal

## Traduções

O sistema suporta múltiplos idiomas através do sistema de traduções:

### Português (pt-br)
```json
{
  "profileSelection": {
    "title": "Quem está assistindo?",
    "subtitle": "Escolha um perfil para continuar",
    "addProfile": "Adicionar Perfil",
    "manageProfiles": "Gerenciar Perfis",
    "switchAccount": "Trocar Conta",
    "addNewAccount": "Adicionar Nova Conta",
    "removeAccount": "Remover Conta",
    "lastLogin": "Último login: {date}",
    "noProfiles": "Nenhum perfil encontrado",
    "loginToAddProfile": "Faça login para adicionar perfis",
    "loading": "Carregando perfis...",
    "error": "Erro ao carregar perfis",
    "confirmRemove": "Tem certeza que deseja remover esta conta?",
    "confirmRemoveDescription": "Esta ação não pode ser desfeita.",
    "remove": "Remover",
    "cancel": "Cancelar"
  }
}
```

### Inglês (en)
```json
{
  "profileSelection": {
    "title": "Who's watching?",
    "subtitle": "Choose a profile to continue",
    "addProfile": "Add Profile",
    "manageProfiles": "Manage Profiles",
    "switchAccount": "Switch Account",
    "addNewAccount": "Add New Account",
    "removeAccount": "Remove Account",
    "lastLogin": "Last login: {date}",
    "noProfiles": "No profiles found",
    "loginToAddProfile": "Login to add profiles",
    "loading": "Loading profiles...",
    "error": "Error loading profiles",
    "confirmRemove": "Are you sure you want to remove this account?",
    "confirmRemoveDescription": "This action cannot be undone.",
    "remove": "Remove",
    "cancel": "Cancel"
  }
}
```

## Segurança

### 1. Armazenamento Local
- Tokens são armazenados no `localStorage` (mesmo comportamento anterior)
- Cookies são mantidos para compatibilidade
- Dados são criptografados pelo próprio localStorage do navegador

### 2. Validação
- Tokens são validados a cada requisição
- Contas inválidas são automaticamente removidas
- Sistema de fallback para dados corrompidos

### 3. Limpeza
- Tokens expirados são removidos automaticamente
- Dados corrompidos são limpos
- Logout remove todas as contas se necessário

## Limitações

1. **Armazenamento Local**: Dados ficam apenas no dispositivo do usuário
2. **Sincronização**: Não há sincronização entre dispositivos
3. **Limite de Contas**: Não há limite técnico, mas recomendamos máximo 10 contas
4. **Compatibilidade**: Funciona apenas em navegadores modernos com localStorage

## Próximos Passos

1. **Sincronização**: Implementar sincronização entre dispositivos
2. **Limites**: Adicionar limite de contas por usuário
3. **Backup**: Sistema de backup/restore de contas
4. **Analytics**: Métricas de uso do sistema
5. **Testes**: Testes automatizados para o sistema

## Troubleshooting

### Problema: Contas não aparecem
**Solução**: Verificar se o localStorage está habilitado e não está cheio

### Problema: Erro ao trocar conta
**Solução**: Verificar se o token ainda é válido, se não, fazer login novamente

### Problema: Dados corrompidos
**Solução**: Sistema limpa automaticamente dados corrompidos

### Problema: Performance
**Solução**: Sistema carrega dados apenas quando necessário 