$ErrorActionPreference = 'Stop'
try {
    $listener = Get-NetTCPConnection -State Listen -LocalPort 5174 | Where-Object { $_.LocalAddress -eq '192.168.18.6' } | Select-Object -First 1
    if (-not $listener) { throw 'Servidor nao encontrado na porta 5174.' }
    $nodePath = (Get-Process -Id $listener.OwningProcess).Path
    if ([System.IO.Path]::GetFileName($nodePath) -ne 'node.exe') { throw 'O servidor nao e um processo Node.' }
    if (-not (Get-NetFirewallRule -Name 'UXPortfolioTablet5174' -ErrorAction SilentlyContinue)) {
        New-NetFirewallRule -Name 'UXPortfolioTablet5174' -DisplayName 'UX Portfolio - tablet na rede local (5174)' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 5174 -LocalAddress 192.168.18.6 -RemoteAddress 192.168.18.0/24 -InterfaceAlias 'Wi-Fi' -Program $nodePath -Profile Any | Out-Null
    }
    Get-NetFirewallRule -Name 'UXPortfolioTablet5174' | Select-Object Name, Enabled, Action | ConvertTo-Json | Set-Content -LiteralPath 'C:\projetos\ux-portifolio\tmp\tablet-firewall-result.json'
} catch {
    @{ Error = $_.Exception.Message } | ConvertTo-Json | Set-Content -LiteralPath 'C:\projetos\ux-portifolio\tmp\tablet-firewall-result.json'
    exit 1
}
