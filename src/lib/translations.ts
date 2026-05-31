export interface Stat {
  value: string;
  label: string;
}

export interface Cap {
  cmd: string;
  desc: string;
}

export interface Translations {
  aboutLabel: string;
  contextroName: string;
  agentycName: string;
  productsLabel: string;
  repositoryIntelligenceLabel: string;
  browserAutomationLabel: string;
  productPageLabel: string;
  docsLabel: string;
  exploreContextro: string;
  exploreAgentyc: string;
  tagline: string;
  description: string;
  status: string;
  contextroBadge: string;
  contextroDesc: string;
  agentycBadge: string;
  agentycDesc: string;
  install: string;
  capabilities: string;
  viewOnNpm: string;
  viewOnPyPI: string;
  stats: Stat[];
  caps: Cap[];
}

const translations: Record<string, Translations> = {
  en: {
    aboutLabel: "About",
    contextroName: "Contextro",
    agentycName: "Agentyc",
    productsLabel: "Products",
    repositoryIntelligenceLabel: "Repository intelligence",
    browserAutomationLabel: "Browser automation",
    productPageLabel: "Product page",
    docsLabel: "Docs",
    exploreContextro: "Explore Contextro",
    exploreAgentyc: "Explore Agentyc",
    tagline: "Applied Innovation · Product Studio",
    description:
      "We build products that make every token count — less noise, more signal, faster AI.",
    status: "Active",
    contextroBadge: "Local first",
    contextroDesc:
      "Single Rust binary. Local MCP server for Claude, Cursor, Windsurf, and other clients - search code by meaning, trace call graphs, inspect change impact, query git history, and keep memory across sessions without sending code to the cloud.",
    agentycBadge: "Browser MCP",
    agentycDesc:
      "Deterministic, MCP-first browser automation for coding agents. Launch or attach to Chrome over CDP, inspect compact page state with stable refs, extract structured content, and debug real browser traffic without an LLM in the critical path.",
    install: "Install",
    capabilities: "Capabilities",
    viewOnNpm: "View on npm ↗",
    viewOnPyPI: "View on PyPI ↗",
    stats: [
      { value: "43×", label: "fewer tokens to find a function" },
      { value: "500×", label: "fewer tokens to trace callers" },
      { value: "<50ms", label: "cold start" },
      { value: "35", label: "MCP tools" },
    ],
    caps: [
      { cmd: "search()", desc: "Hybrid semantic + keyword + graph retrieval" },
      { cmd: "impact()", desc: "Inspect blast radius before edits or refactors" },
      { cmd: "code()", desc: "AST-based search, patterns, and rewrites" },
      { cmd: "commit_search()", desc: "Search git history by meaning" },
      { cmd: "knowledge()", desc: "Index docs and notes beside code" },
      { cmd: "restore()", desc: "Recover session context and project state" },
    ],
  },

  es: {
    aboutLabel: "Acerca de",
    contextroName: "Contextro",
    agentycName: "Agentyc",
    productsLabel: "Productos",
    repositoryIntelligenceLabel: "Inteligencia de repositorios",
    browserAutomationLabel: "Automatizacion de navegador",
    productPageLabel: "Producto",
    docsLabel: "Docs",
    exploreContextro: "Explorar Contextro",
    exploreAgentyc: "Explorar Agentyc",
    tagline: "Innovación Aplicada · Estudio de Producto",
    description:
      "Construimos productos que hacen que cada token cuente — menos ruido, más señal, IA más rápida.",
    status: "Activo",
    contextroBadge: "Local first",
    contextroDesc:
      "Binario unico en Rust. Servidor MCP local para Claude, Cursor, Windsurf y otros clientes: busca codigo por significado, traza grafos de llamadas, inspecciona el impacto de cambios, consulta el historial git y conserva memoria entre sesiones sin enviar tu codigo a la nube.",
    agentycBadge: "Browser MCP",
    agentycDesc:
      "Automatizacion de navegador determinista y MCP-first para agentes de codigo. Lanza o conecta Chrome por CDP, inspecciona estado compacto con refs estables, extrae contenido estructurado y depura trafico real del navegador sin un LLM en la ruta critica.",
    install: "Instalar",
    capabilities: "Capacidades",
    viewOnNpm: "Ver en npm ↗",
    viewOnPyPI: "Ver en PyPI ↗",
    stats: [
      { value: "43×", label: "menos tokens para encontrar una función" },
      { value: "500×", label: "menos tokens para rastrear llamadas" },
      { value: "<50ms", label: "arranque en frio" },
      { value: "35", label: "herramientas MCP" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Recuperacion hibrida: semantica + palabras clave + grafo",
      },
      {
        cmd: "impact()",
        desc: "Inspecciona el radio de impacto antes de editar o refactorizar",
      },
      { cmd: "code()", desc: "Busqueda AST, patrones y reescrituras" },
      {
        cmd: "commit_search()",
        desc: "Busca en el historial git por significado",
      },
      { cmd: "knowledge()", desc: "Indexa docs y notas junto al codigo" },
      { cmd: "restore()", desc: "Recupera contexto de sesion y estado del proyecto" },
    ],
  },

  fr: {
    aboutLabel: "A propos",
    contextroName: "Contextro",
    agentycName: "Agentyc",
    productsLabel: "Produits",
    repositoryIntelligenceLabel: "Intelligence de depot",
    browserAutomationLabel: "Automatisation de navigateur",
    productPageLabel: "Produit",
    docsLabel: "Docs",
    exploreContextro: "Explorer Contextro",
    exploreAgentyc: "Explorer Agentyc",
    tagline: "Innovation Appliquée · Studio Produit",
    description:
      "Nous créons des produits qui font compter chaque token — moins de bruit, plus de signal, une IA plus rapide.",
    status: "Actif",
    contextroBadge: "Local first",
    contextroDesc:
      "Binaire Rust unique. Serveur MCP local pour Claude, Cursor, Windsurf et d'autres clients : recherchez le code par sens, tracez les graphes d'appels, inspectez l'impact des changements, interrogez l'historique git et conservez la memoire entre les sessions sans envoyer votre code dans le cloud.",
    agentycBadge: "Browser MCP",
    agentycDesc:
      "Automatisation de navigateur deterministe et MCP-first pour agents de code. Lancez ou attachez Chrome via CDP, inspectez un etat compact avec des refs stables, extrayez du contenu structure et diagnostiquez le trafic reel du navigateur sans LLM dans le chemin critique.",
    install: "Installer",
    capabilities: "Fonctionnalités",
    viewOnNpm: "Voir sur npm ↗",
    viewOnPyPI: "Voir sur PyPI ↗",
    stats: [
      { value: "43×", label: "moins de tokens pour trouver une fonction" },
      { value: "500×", label: "moins de tokens pour tracer les appelants" },
      { value: "<50ms", label: "demarrage a froid" },
      { value: "35", label: "outils MCP" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Recherche hybride : semantique + mots-cles + graphe",
      },
      {
        cmd: "impact()",
        desc: "Inspecter le rayon d'impact avant modification ou refactorisation",
      },
      { cmd: "code()", desc: "Recherche AST, motifs et reecritures" },
      {
        cmd: "commit_search()",
        desc: "Rechercher dans l'historique git par sens",
      },
      { cmd: "knowledge()", desc: "Indexer docs et notes a cote du code" },
      { cmd: "restore()", desc: "Restaurer le contexte de session et l'etat du projet" },
    ],
  },

  de: {
    aboutLabel: "Uber uns",
    contextroName: "Contextro",
    agentycName: "Agentyc",
    productsLabel: "Produkte",
    repositoryIntelligenceLabel: "Repository Intelligence",
    browserAutomationLabel: "Browser Automatisierung",
    productPageLabel: "Produktseite",
    docsLabel: "Docs",
    exploreContextro: "Contextro ansehen",
    exploreAgentyc: "Agentyc ansehen",
    tagline: "Angewandte Innovation · Produktstudio",
    description:
      "Wir bauen Produkte, die jeden Token zählen lassen — weniger Rauschen, mehr Signal, schnellere KI.",
    status: "Aktiv",
    contextroBadge: "Local first",
    contextroDesc:
      "Ein einzelnes Rust-Binary. Lokaler MCP-Server fur Claude, Cursor, Windsurf und andere Clients - durchsuchen Sie Code nach Bedeutung, verfolgen Sie Aufrufgraphen, prufen Sie Anderungsfolgen, durchsuchen Sie den Git-Verlauf und behalten Sie Speicher zwischen Sitzungen, ohne Code in die Cloud zu senden.",
    agentycBadge: "Browser MCP",
    agentycDesc:
      "Deterministische, MCP-first Browser-Automatisierung fur Coding-Agents. Starten oder verbinden Sie Chrome uber CDP, lesen Sie kompakten Seitenstatus mit stabilen Refs, extrahieren Sie strukturierte Inhalte und debuggen Sie echten Browser-Traffic ohne LLM im kritischen Pfad.",
    install: "Installieren",
    capabilities: "Funktionen",
    viewOnNpm: "Auf npm ansehen ↗",
    viewOnPyPI: "Auf PyPI ansehen ↗",
    stats: [
      { value: "43×", label: "weniger Token um eine Funktion zu finden" },
      { value: "500×", label: "weniger Token um Aufrufer zu verfolgen" },
      { value: "<50ms", label: "Kaltstart" },
      { value: "35", label: "MCP-Werkzeuge" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Hybride Suche: semantisch + Schlusselwort + Graph",
      },
      {
        cmd: "impact()",
        desc: "Auswirkungsradius vor Anderungen oder Refactorings prufen",
      },
      { cmd: "code()", desc: "AST-Suche, Muster und Umschreibungen" },
      { cmd: "commit_search()", desc: "Git-Historie semantisch durchsuchen" },
      {
        cmd: "knowledge()",
        desc: "Dokumente und Notizen neben dem Code indexieren",
      },
      {
        cmd: "restore()",
        desc: "Sitzungskontext und Projektstatus wiederherstellen",
      },
    ],
  },

  nl: {
    aboutLabel: "Over",
    contextroName: "Contextro",
    agentycName: "Agentyc",
    productsLabel: "Producten",
    repositoryIntelligenceLabel: "Repository intelligentie",
    browserAutomationLabel: "Browserautomatisering",
    productPageLabel: "Productpagina",
    docsLabel: "Docs",
    exploreContextro: "Verken Contextro",
    exploreAgentyc: "Verken Agentyc",
    tagline: "Toegepaste Innovatie · Productstudio",
    description:
      "Wij bouwen producten die elke token laten tellen — minder ruis, meer signaal, snellere AI.",
    status: "Actief",
    contextroBadge: "Local first",
    contextroDesc:
      "Een enkele Rust-binary. Lokale MCP-server voor Claude, Cursor, Windsurf en andere clients - zoek code op betekenis, volg aanroepgrafieken, inspecteer wijzigingsimpact, doorzoek git-geschiedenis en bewaar geheugen tussen sessies zonder code naar de cloud te sturen.",
    agentycBadge: "Browser MCP",
    agentycDesc:
      "Deterministische, MCP-first browserautomatisering voor coding agents. Start of koppel Chrome via CDP, lees compacte paginastatus met stabiele refs, extraheer gestructureerde inhoud en debug echt browserverkeer zonder een LLM in het kritieke pad.",
    install: "Installeren",
    capabilities: "Mogelijkheden",
    viewOnNpm: "Bekijk op npm ↗",
    viewOnPyPI: "Bekijk op PyPI ↗",
    stats: [
      { value: "43×", label: "minder tokens om een functie te vinden" },
      { value: "500×", label: "minder tokens om aanroepers te volgen" },
      { value: "<50ms", label: "koude start" },
      { value: "35", label: "MCP-tools" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Hybride retrieval: semantisch + trefwoord + graaf",
      },
      {
        cmd: "impact()",
        desc: "Impactradius inspecteren voor edits of refactors",
      },
      { cmd: "code()", desc: "AST-zoeken, patronen en rewrites" },
      { cmd: "commit_search()", desc: "Zoek git-geschiedenis op betekenis" },
      { cmd: "knowledge()", desc: "Indexeer docs en notities naast de code" },
      { cmd: "restore()", desc: "Herstel sessiecontext en projectstatus" },
    ],
  },

  pl: {
    aboutLabel: "O nas",
    contextroName: "Contextro",
    agentycName: "Agentyc",
    productsLabel: "Produkty",
    repositoryIntelligenceLabel: "Inteligencja repozytorium",
    browserAutomationLabel: "Automatyzacja przegladarki",
    productPageLabel: "Strona produktu",
    docsLabel: "Docs",
    exploreContextro: "Poznaj Contextro",
    exploreAgentyc: "Poznaj Agentyc",
    tagline: "Stosowana Innowacja · Studio Produktowe",
    description:
      "Tworzymy produkty, które sprawiają, że każdy token ma znaczenie — mniej szumu, więcej sygnału, szybsza AI.",
    status: "Aktywny",
    contextroBadge: "Local first",
    contextroDesc:
      "Pojedynczy binarny program w Rust. Lokalny serwer MCP dla Claude, Cursor, Windsurf i innych klientow - szukaj kodu wedlug znaczenia, sledz grafy wywolan, sprawdzaj wplyw zmian, przeszukuj historie gita i zachowuj pamiec miedzy sesjami bez wysylania kodu do chmury.",
    agentycBadge: "Browser MCP",
    agentycDesc:
      "Deterministyczna, MCP-first automatyzacja przegladarki dla agentow kodujacych. Uruchamiaj lub podlacz Chrome przez CDP, odczytuj zwarty stan strony ze stabilnymi refami, wyciagaj ustrukturyzowana zawartosc i diagnozuj prawdziwy ruch przegladarki bez LLM w krytycznej sciezce.",
    install: "Instaluj",
    capabilities: "Możliwości",
    viewOnNpm: "Zobacz w npm ↗",
    viewOnPyPI: "Zobacz w PyPI ↗",
    stats: [
      { value: "43×", label: "mniej tokenów do znalezienia funkcji" },
      { value: "500×", label: "mniej tokenów do śledzenia wywołujących" },
      { value: "<50ms", label: "zimny start" },
      { value: "35", label: "narzedzia MCP" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Hybrydowe wyszukiwanie: semantyka + slowa kluczowe + graf",
      },
      {
        cmd: "impact()",
        desc: "Sprawdz zasieg wplywu przed edycja lub refaktorem",
      },
      { cmd: "code()", desc: "Wyszukiwanie AST, wzorce i przepisywanie" },
      {
        cmd: "commit_search()",
        desc: "Przeszukuj historie gita wedlug znaczenia",
      },
      { cmd: "knowledge()", desc: "Indeksuj dokumenty i notatki obok kodu" },
      { cmd: "restore()", desc: "Odtwarzaj kontekst sesji i stan projektu" },
    ],
  },
};

export const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  nl: "Nederlands",
  pl: "Polski",
};

export default function getTranslations(locale: string): Translations {
  return translations[locale] ?? translations["en"]!;
}
