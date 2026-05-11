export interface Stat {
  value: string;
  label: string;
}

export interface Cap {
  cmd: string;
  desc: string;
}

export interface Translations {
  tagline: string;
  description: string;
  status: string;
  openSource: string;
  contextroDesc: string;
  install: string;
  capabilities: string;
  viewOnPypi: string;
  stats: Stat[];
  caps: Cap[];
}

const translations: Record<string, Translations> = {
  en: {
    tagline: "Applied Innovation · Product Studio",
    description:
      "We are a product studio crafting focused, independent brands built to last.",
    status: "Active",
    openSource: "Open Source",
    contextroDesc:
      "Give your AI coding agent a brain. A local MCP server that connects Claude, Cursor, or any agent to your codebase — search by meaning, trace call graphs, check what breaks before a refactor. No cloud. No API keys.",
    install: "Install",
    capabilities: "Capabilities",
    viewOnPypi: "View on PyPI ↗",
    stats: [
      { value: "43×", label: "fewer tokens to find a function" },
      { value: "500×", label: "fewer tokens to trace callers" },
      { value: "<2ms", label: "search latency (warm index)" },
      { value: "35", label: "tools out of the box" },
    ],
    caps: [
      { cmd: "search()", desc: "Hybrid semantic + keyword + graph search" },
      { cmd: "explain()", desc: "Full symbol: definition, callers, callees" },
      { cmd: "impact()", desc: "What breaks if you change this?" },
      { cmd: "commit_search()", desc: "Search git history by meaning" },
      { cmd: "remember()", desc: "Persistent memory across sessions" },
      { cmd: "architecture()", desc: "Layers, entry points, hub symbols" },
    ],
  },

  es: {
    tagline: "Innovación Aplicada · Estudio de Producto",
    description:
      "Somos un estudio de producto que construye marcas independientes y enfocadas, hechas para durar.",
    status: "Activo",
    openSource: "Código Abierto",
    contextroDesc:
      "Dale un cerebro a tu agente de IA. Un servidor MCP local que conecta Claude, Cursor o cualquier agente a tu codebase — busca por significado, traza grafos de llamadas, verifica qué rompe antes de refactorizar. Sin nube. Sin claves API.",
    install: "Instalar",
    capabilities: "Capacidades",
    viewOnPypi: "Ver en PyPI ↗",
    stats: [
      { value: "43×", label: "menos tokens para encontrar una función" },
      { value: "500×", label: "menos tokens para rastrear llamadas" },
      { value: "<2ms", label: "latencia de búsqueda (índice cargado)" },
      { value: "35", label: "herramientas incluidas" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Búsqueda híbrida: semántica + palabras clave + grafo",
      },
      {
        cmd: "explain()",
        desc: "Símbolo completo: definición, llamantes, llamados",
      },
      { cmd: "impact()", desc: "¿Qué se rompe si cambias esto?" },
      {
        cmd: "commit_search()",
        desc: "Busca en historial git por significado",
      },
      { cmd: "remember()", desc: "Memoria persistente entre sesiones" },
      { cmd: "architecture()", desc: "Capas, puntos de entrada, símbolos hub" },
    ],
  },

  fr: {
    tagline: "Innovation Appliquée · Studio Produit",
    description:
      "Nous sommes un studio produit qui crée des marques indépendantes et ciblées, conçues pour durer.",
    status: "Actif",
    openSource: "Open Source",
    contextroDesc:
      "Donnez un cerveau à votre agent IA. Un serveur MCP local qui connecte Claude, Cursor ou tout agent à votre base de code — recherchez par sens, tracez les graphes d'appels, vérifiez ce qui casse avant un refactoring. Sans cloud. Sans clés API.",
    install: "Installer",
    capabilities: "Fonctionnalités",
    viewOnPypi: "Voir sur PyPI ↗",
    stats: [
      { value: "43×", label: "moins de tokens pour trouver une fonction" },
      { value: "500×", label: "moins de tokens pour tracer les appelants" },
      { value: "<2ms", label: "latence de recherche (index chaud)" },
      { value: "35", label: "outils inclus" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Recherche hybride : sémantique + mots-clés + graphe",
      },
      {
        cmd: "explain()",
        desc: "Symbole complet : définition, appelants, appelés",
      },
      { cmd: "impact()", desc: "Qu'est-ce qui casse si vous changez ceci ?" },
      {
        cmd: "commit_search()",
        desc: "Rechercher dans l'historique git par sens",
      },
      { cmd: "remember()", desc: "Mémoire persistante entre sessions" },
      { cmd: "architecture()", desc: "Couches, points d'entrée, symboles hub" },
    ],
  },

  de: {
    tagline: "Angewandte Innovation · Produktstudio",
    description:
      "Wir sind ein Produktstudio, das fokussierte, unabhängige Marken entwickelt, die Bestand haben.",
    status: "Aktiv",
    openSource: "Open Source",
    contextroDesc:
      "Geben Sie Ihrem KI-Agenten ein Gehirn. Ein lokaler MCP-Server, der Claude, Cursor oder jeden Agenten mit Ihrer Codebasis verbindet — suchen Sie nach Bedeutung, verfolgen Sie Aufrufgraphen, prüfen Sie was bricht bevor Sie refaktorieren. Keine Cloud. Keine API-Schlüssel.",
    install: "Installieren",
    capabilities: "Funktionen",
    viewOnPypi: "Auf PyPI ansehen ↗",
    stats: [
      { value: "43×", label: "weniger Token um eine Funktion zu finden" },
      { value: "500×", label: "weniger Token um Aufrufer zu verfolgen" },
      { value: "<2ms", label: "Suchlatenz (warmer Index)" },
      { value: "35", label: "integrierte Werkzeuge" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Hybride Suche: semantisch + Schlüsselwort + Graph",
      },
      {
        cmd: "explain()",
        desc: "Vollständiges Symbol: Definition, Aufrufer, Aufgerufene",
      },
      { cmd: "impact()", desc: "Was bricht, wenn Sie das ändern?" },
      { cmd: "commit_search()", desc: "Git-Historie semantisch durchsuchen" },
      {
        cmd: "remember()",
        desc: "Persistentes Gedächtnis über Sitzungen hinweg",
      },
      {
        cmd: "architecture()",
        desc: "Schichten, Einstiegspunkte, Hub-Symbole",
      },
    ],
  },

  nl: {
    tagline: "Toegepaste Innovatie · Productstudio",
    description:
      "Wij zijn een productstudio die gerichte, onafhankelijke merken bouwt die blijven.",
    status: "Actief",
    openSource: "Open Source",
    contextroDesc:
      "Geef uw AI-codeeragent een brein. Een lokale MCP-server die Claude, Cursor of elke agent verbindt met uw codebase — zoek op betekenis, volg aanroepgrafieken, controleer wat breekt vóór een refactoring. Geen cloud. Geen API-sleutels.",
    install: "Installeren",
    capabilities: "Mogelijkheden",
    viewOnPypi: "Bekijk op PyPI ↗",
    stats: [
      { value: "43×", label: "minder tokens om een functie te vinden" },
      { value: "500×", label: "minder tokens om aanroepers te volgen" },
      { value: "<2ms", label: "zoeklatentie (warm index)" },
      { value: "35", label: "ingebouwde tools" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Hybride zoeken: semantisch + trefwoord + graaf",
      },
      {
        cmd: "explain()",
        desc: "Volledig symbool: definitie, aanroepers, aangeroepenen",
      },
      { cmd: "impact()", desc: "Wat breekt als u dit wijzigt?" },
      { cmd: "commit_search()", desc: "Zoek git-geschiedenis op betekenis" },
      { cmd: "remember()", desc: "Persistent geheugen over sessies" },
      { cmd: "architecture()", desc: "Lagen, toegangspunten, hub-symbolen" },
    ],
  },

  pl: {
    tagline: "Stosowana Innowacja · Studio Produktowe",
    description:
      "Jesteśmy studiem produktowym tworzącym skoncentrowane, niezależne marki stworzone, by przetrwać.",
    status: "Aktywny",
    openSource: "Open Source",
    contextroDesc:
      "Daj swojemu agentowi AI mózg. Lokalny serwer MCP, który łączy Claude, Cursor lub dowolnego agenta z Twoją bazą kodu — szukaj według znaczenia, śledź grafy wywołań, sprawdź co się psuje przed refaktorem. Bez chmury. Bez kluczy API.",
    install: "Instaluj",
    capabilities: "Możliwości",
    viewOnPypi: "Zobacz na PyPI ↗",
    stats: [
      { value: "43×", label: "mniej tokenów do znalezienia funkcji" },
      { value: "500×", label: "mniej tokenów do śledzenia wywołujących" },
      { value: "<2ms", label: "opóźnienie wyszukiwania (ciepły indeks)" },
      { value: "35", label: "narzędzi w zestawie" },
    ],
    caps: [
      {
        cmd: "search()",
        desc: "Hybrydowe wyszukiwanie: semantyczne + słów kluczowych + graf",
      },
      {
        cmd: "explain()",
        desc: "Pełny symbol: definicja, wywołujący, wywoływani",
      },
      { cmd: "impact()", desc: "Co się psuje jeśli to zmienisz?" },
      {
        cmd: "commit_search()",
        desc: "Przeszukuj historię git według znaczenia",
      },
      { cmd: "remember()", desc: "Trwała pamięć między sesjami" },
      { cmd: "architecture()", desc: "Warstwy, punkty wejścia, symbole hub" },
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
