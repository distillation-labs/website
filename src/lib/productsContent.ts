export interface ProductsPageContent {
  breadcrumb: string;
  heroTitle: string;
  heroDescription: string;
  thesisLabel: string;
  thesisTitle: string;
  thesisParagraphs: string[];
  fitLabel: string;
  fitCards: Array<{
    title: string;
    body: string;
  }>;
  nextStepLabel: string;
  nextStepTitle: string;
  nextStepBody: string;
}

const productsContent = {
  en: {
    breadcrumb: 'Products',
    heroTitle: 'Two products built to reduce context waste.',
    heroDescription:
      'Distillation Labs builds developer tools for the practical efficiency layer around AI. Contextro compresses repository context before an agent edits. Agentyc gives the agent a deterministic browser runtime when it needs the live application.',
    thesisLabel: 'Shared thesis',
    thesisTitle: 'Different surfaces, same operating model',
    thesisParagraphs: [
      'Both products are designed around the same constraint: useful AI gets more practical when the system retrieves less junk and returns a tighter, more inspectable surface.',
      'Contextro solves the repository side of that problem with compact code retrieval, graph-aware inspection, and durable project memory. Agentyc solves the browser side with stable refs, compact page state, deterministic extraction, and CDP-native debugging.',
    ],
    fitLabel: 'Where each product fits',
    fitCards: [
      {
        title: 'Use Contextro before code changes',
        body: 'Reach for Contextro when the agent needs the right symbol, call path, architecture boundary, or historical context before it edits a repository.',
      },
      {
        title: 'Use Agentyc in the live app',
        body: 'Reach for Agentyc when the agent needs to inspect a rendered UI, act in the browser, wait on network activity, or debug the app from the browser side.',
      },
      {
        title: 'Use both for end-to-end workflows',
        body: 'Together they let an agent move from repo understanding to live-browser validation without switching to noisy, full-context tooling.',
      },
    ],
    nextStepLabel: 'Next step',
    nextStepTitle: 'Choose the surface you need first',
    nextStepBody:
      'Start with the product page when you want the operating model and tradeoffs. Move to the docs when you are ready to install, configure an MCP client, and use the tools in real workflows.',
  },
  es: {
    breadcrumb: 'Productos',
    heroTitle: 'Dos productos construidos para reducir desperdicio de contexto.',
    heroDescription:
      'Distillation Labs construye herramientas para desarrolladores alrededor de la capa practica de eficiencia de la IA. Contextro comprime el contexto del repositorio antes de que un agente edite. Agentyc le da al agente un runtime de navegador determinista cuando necesita la aplicacion viva.',
    thesisLabel: 'Tesis compartida',
    thesisTitle: 'Superficies distintas, mismo modelo operativo',
    thesisParagraphs: [
      'Ambos productos se disenan alrededor de la misma restriccion: la IA util se vuelve mas practica cuando el sistema recupera menos basura y devuelve una superficie mas pequena y mas inspeccionable.',
      'Contextro resuelve el lado del repositorio con recuperacion compacta de codigo, inspeccion consciente del grafo y memoria durable del proyecto. Agentyc resuelve el lado del navegador con refs estables, estado compacto, extraccion determinista y depuracion nativa de CDP.',
    ],
    fitLabel: 'Donde encaja cada producto',
    fitCards: [
      {
        title: 'Usa Contextro antes de cambiar codigo',
        body: 'Usa Contextro cuando el agente necesita el simbolo correcto, la ruta de llamadas, el limite arquitectonico o el contexto historico antes de editar un repositorio.',
      },
      {
        title: 'Usa Agentyc dentro de la app viva',
        body: 'Usa Agentyc cuando el agente necesita inspeccionar una UI renderizada, actuar en el navegador, esperar actividad de red o depurar la app desde el lado del navegador.',
      },
      {
        title: 'Usa ambos para flujos de extremo a extremo',
        body: 'Juntos permiten pasar de entender el repositorio a validar en el navegador real sin cambiar a herramientas ruidosas de contexto completo.',
      },
    ],
    nextStepLabel: 'Siguiente paso',
    nextStepTitle: 'Elige primero la superficie que necesitas',
    nextStepBody:
      'Empieza con la pagina del producto si quieres entender el modelo operativo y los tradeoffs. Pasa a la documentacion cuando quieras instalar, configurar un cliente MCP y usar las herramientas en flujos reales.',
  },
  fr: {
    breadcrumb: 'Produits',
    heroTitle: 'Deux produits concus pour reduire le gaspillage de contexte.',
    heroDescription:
      'Distillation Labs construit des outils pour developpeurs autour de la couche pratique d efficacite de l IA. Contextro compresse le contexte du depot avant qu un agent modifie le code. Agentyc donne a l agent un runtime navigateur deterministe lorsqu il a besoin de l application live.',
    thesisLabel: 'These commune',
    thesisTitle: 'Des surfaces differentes, un meme modele operatoire',
    thesisParagraphs: [
      'Les deux produits sont construits autour de la meme contrainte: l IA utile devient plus pratique lorsque le systeme recupere moins de bruit et renvoie une surface plus petite et plus lisible.',
      'Contextro traite le cote depot avec une recuperation de code compacte, une inspection consciente du graphe et une memoire de projet durable. Agentyc traite le cote navigateur avec des refs stables, un etat compact, une extraction deterministe et un debug natif CDP.',
    ],
    fitLabel: 'Ou chaque produit intervient',
    fitCards: [
      {
        title: 'Utiliser Contextro avant les modifications de code',
        body: 'Prenez Contextro quand l agent a besoin du bon symbole, du bon chemin d appels, d une frontiere d architecture ou d un contexte historique avant de modifier un depot.',
      },
      {
        title: 'Utiliser Agentyc dans l application live',
        body: 'Prenez Agentyc quand l agent doit inspecter une UI rendue, agir dans le navigateur, attendre l activite reseau ou debugger l application depuis le navigateur.',
      },
      {
        title: 'Utiliser les deux pour des workflows complets',
        body: 'Ensemble, ils permettent de passer de la comprehension du depot a la validation dans le vrai navigateur sans revenir a des outils bruyants et pleins contexte.',
      },
    ],
    nextStepLabel: 'Etape suivante',
    nextStepTitle: 'Choisissez d abord la surface dont vous avez besoin',
    nextStepBody:
      'Commencez par la page produit si vous voulez comprendre le modele operatoire et les compromis. Passez ensuite aux docs pour installer, configurer un client MCP et utiliser les outils dans de vrais workflows.',
  },
  de: {
    breadcrumb: 'Produkte',
    heroTitle: 'Zwei Produkte, gebaut um Kontextverschwendung zu senken.',
    heroDescription:
      'Distillation Labs baut Entwicklerwerkzeuge fur die praktische Effizienzschicht rund um KI. Contextro komprimiert Repository Kontext, bevor ein Agent editiert. Agentyc gibt dem Agenten eine deterministische Browser Laufzeit, wenn er die Live Anwendung braucht.',
    thesisLabel: 'Gemeinsame These',
    thesisTitle: 'Unterschiedliche Oberflachen, dasselbe Betriebsmodell',
    thesisParagraphs: [
      'Beide Produkte sind um dieselbe Einschrankung herum gebaut: Nutzliche KI wird praktischer, wenn das System weniger Rauschen abruft und eine kleinere, besser kontrollierbare Surface zuruckgibt.',
      'Contextro lost die Repository Seite mit kompakter Code Retrieval, graphbewusster Inspektion und dauerhaftem Projekt Memory. Agentyc lost die Browser Seite mit stabilen Refs, kompaktem Seitenstatus, deterministischer Extraktion und CDP nativem Debugging.',
    ],
    fitLabel: 'Wo jedes Produkt passt',
    fitCards: [
      {
        title: 'Contextro vor Codeanderungen verwenden',
        body: 'Greifen Sie zu Contextro, wenn der Agent vor einem Edit das richtige Symbol, den Call Pfad, die Architekturgrenze oder historischen Kontext braucht.',
      },
      {
        title: 'Agentyc in der Live App verwenden',
        body: 'Greifen Sie zu Agentyc, wenn der Agent eine gerenderte UI inspizieren, im Browser handeln, auf Netzaktivitat warten oder die App von der Browserseite debuggen muss.',
      },
      {
        title: 'Beide fur End to End Workflows verwenden',
        body: 'Zusammen lassen sie einen Agenten von Repository Verstandnis zu Live Browser Validierung wechseln, ohne auf laute Full Context Werkzeuge umzusteigen.',
      },
    ],
    nextStepLabel: 'Nachster Schritt',
    nextStepTitle: 'Wahlen Sie zuerst die Surface, die Sie brauchen',
    nextStepBody:
      'Starten Sie mit der Produktseite, wenn Sie Betriebsmodell und Tradeoffs verstehen wollen. Wechseln Sie zu den Docs, wenn Sie installieren, einen MCP Client konfigurieren und die Tools in echten Workflows nutzen wollen.',
  },
  nl: {
    breadcrumb: 'Producten',
    heroTitle: 'Twee producten gebouwd om contextverspilling te verminderen.',
    heroDescription:
      'Distillation Labs bouwt developer tools rond de praktische efficientielaag van AI. Contextro comprimeert repositorycontext voordat een agent code wijzigt. Agentyc geeft de agent een deterministische browserruntime wanneer de live applicatie nodig is.',
    thesisLabel: 'Gedeelde these',
    thesisTitle: 'Verschillende oppervlakken, hetzelfde werkmodel',
    thesisParagraphs: [
      'Beide producten zijn ontworpen rond dezelfde beperking: bruikbare AI wordt praktischer wanneer het systeem minder ruis ophaalt en een kleiner, beter inspecteerbaar oppervlak teruggeeft.',
      'Contextro lost de repositorykant op met compacte coderetrieval, graafbewuste inspectie en duurzaam projectgeheugen. Agentyc lost de browserkant op met stabiele refs, compacte paginastatus, deterministische extractie en CDP native debugging.',
    ],
    fitLabel: 'Waar elk product past',
    fitCards: [
      {
        title: 'Gebruik Contextro voor codewijzigingen',
        body: 'Gebruik Contextro wanneer de agent het juiste symbool, aanroeppad, architectuurgrens of historische context nodig heeft voordat hij een repository bewerkt.',
      },
      {
        title: 'Gebruik Agentyc in de live app',
        body: 'Gebruik Agentyc wanneer de agent een gerenderde UI moet inspecteren, in de browser moet handelen, op netwerkactiviteit moet wachten of de app vanuit de browser moet debuggen.',
      },
      {
        title: 'Gebruik beide voor end to end workflows',
        body: 'Samen laten ze een agent van repositorybegrip naar validatie in de live browser gaan zonder terug te vallen op luidruchtige full-context tooling.',
      },
    ],
    nextStepLabel: 'Volgende stap',
    nextStepTitle: 'Kies eerst het oppervlak dat je nodig hebt',
    nextStepBody:
      'Begin met de productpagina wanneer je het werkmodel en de afwegingen wilt begrijpen. Ga naar de docs wanneer je wilt installeren, een MCP client wilt configureren en de tools in echte workflows wilt gebruiken.',
  },
  pl: {
    breadcrumb: 'Produkty',
    heroTitle: 'Dwa produkty zbudowane po to, by ograniczac marnowanie kontekstu.',
    heroDescription:
      'Distillation Labs buduje narzedzia developerskie wokol praktycznej warstwy efektywnosci AI. Contextro kompresuje kontekst repozytorium zanim agent zacznie edytowac. Agentyc daje agentowi deterministyczny browser runtime, gdy potrzebna jest zywa aplikacja.',
    thesisLabel: 'Wspolna teza',
    thesisTitle: 'Rozne powierzchnie, ten sam model pracy',
    thesisParagraphs: [
      'Oba produkty sa zbudowane wokol tego samego ograniczenia: uzyteczna AI staje sie bardziej praktyczna, gdy system pobiera mniej szumu i zwraca mniejsza, latwiejsza do inspekcji powierzchnie.',
      'Contextro rozwiazuje strone repozytorium przez zwarta retrieval kodu, inspekcje swiadoma grafu i trwala pamiec projektu. Agentyc rozwiazuje strone przegladarki przez stabilne refy, zwarty state strony, deterministyczna ekstrakcje i natywne debugowanie CDP.',
    ],
    fitLabel: 'Gdzie pasuje kazdy produkt',
    fitCards: [
      {
        title: 'Uzyj Contextro przed zmianami w kodzie',
        body: 'Siegnij po Contextro, gdy agent potrzebuje wlasciwego symbolu, sciezki wywolan, granicy architektury albo kontekstu historycznego przed edycja repozytorium.',
      },
      {
        title: 'Uzyj Agentyc w zywej aplikacji',
        body: 'Siegnij po Agentyc, gdy agent musi sprawdzic wyrenderowane UI, dzialac w przegladarce, czekac na aktywnosc sieci albo debugowac aplikacje od strony przegladarki.',
      },
      {
        title: 'Uzyj obu do workflowow end to end',
        body: 'Razem pozwalaja przejsc od zrozumienia repozytorium do walidacji w prawdziwej przegladarce bez przechodzenia na glosne narzedzia full-context.',
      },
    ],
    nextStepLabel: 'Nastepny krok',
    nextStepTitle: 'Najpierw wybierz powierzchnie, ktorej potrzebujesz',
    nextStepBody:
      'Zacznij od strony produktu, jesli chcesz zrozumiec model pracy i kompromisy. Przejdz do docs, gdy chcesz zainstalowac, skonfigurowac klienta MCP i uzywac narzedzi w prawdziwych workflowach.',
  },
} as const;

export default function getProductsContent(locale: string): ProductsPageContent {
  return productsContent[locale as keyof typeof productsContent] ?? productsContent.en;
}
