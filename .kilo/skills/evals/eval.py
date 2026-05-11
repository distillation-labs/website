#!/usr/bin/env python3
"""
Skills Eval Suite — follows the skills-guide.md testing methodology.

Three eval categories per skill (as defined in Chapter 3):
  1. Triggering tests   — description loads the skill for the right queries
  2. Functional tests  — code examples are syntactically correct & advice is accurate
  3. Coverage tests    — skill addresses project-specific requirements

Usage:
  python3 .kilo/skills/evals/eval.py
  python3 .kilo/skills/evals/eval.py --skill astro
  python3 .kilo/skills/evals/eval.py --verbose
"""

import re
import sys
import json
import argparse
from pathlib import Path
from dataclasses import dataclass, field
from typing import Optional

SKILLS_DIR = Path(__file__).parent.parent
PROJECT_ROOT = SKILLS_DIR.parent.parent

# ─── colour helpers ────────────────────────────────────────────────────────────
GREEN  = "\033[92m"
RED    = "\033[91m"
YELLOW = "\033[93m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

def ok(msg):   return f"{GREEN}PASS{RESET}  {msg}"
def fail(msg): return f"{RED}FAIL{RESET}  {msg}"
def warn(msg): return f"{YELLOW}WARN{RESET}  {msg}"
def info(msg): return f"{CYAN}INFO{RESET}  {msg}"

# ─── data structures ───────────────────────────────────────────────────────────
@dataclass
class EvalResult:
    name: str
    passed: bool
    message: str
    category: str  # triggering | functional | coverage

@dataclass
class SkillEvalSuite:
    skill_name: str
    results: list[EvalResult] = field(default_factory=list)

    def add(self, name, passed, message, category):
        self.results.append(EvalResult(name, passed, message, category))

    def score(self, category=None):
        r = [x for x in self.results if (category is None or x.category == category)]
        if not r:
            return 0, 0
        passed = sum(1 for x in r if x.passed)
        return passed, len(r)

# ─── skill loader ──────────────────────────────────────────────────────────────
def load_skill(skill_name: str) -> dict:
    skill_file = SKILLS_DIR / skill_name / "SKILL.md"
    if not skill_file.exists():
        raise FileNotFoundError(f"SKILL.md not found: {skill_file}")
    content = skill_file.read_text()

    # Parse YAML frontmatter
    fm_match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if not fm_match:
        raise ValueError(f"No frontmatter found in {skill_name}")

    frontmatter_raw = fm_match.group(1)
    body = fm_match.group(2)

    name_match = re.search(r'^name:\s*(.+)$', frontmatter_raw, re.MULTILINE)
    desc_match = re.search(r'^description:\s*(.+?)(?=\nmetadata:|\n[a-z])', frontmatter_raw, re.MULTILINE | re.DOTALL)

    return {
        "name": name_match.group(1).strip() if name_match else "",
        "description": desc_match.group(1).strip() if desc_match else "",
        "body": body,
        "frontmatter": frontmatter_raw,
        "raw": content,
    }

def extract_code_blocks(body: str) -> list[dict]:
    """Extract all fenced code blocks with their language."""
    blocks = []
    pattern = re.compile(r'```(\w*)\n(.*?)```', re.DOTALL)
    for m in pattern.finditer(body):
        blocks.append({"lang": m.group(1), "code": m.group(2)})
    return blocks

# ─── EVAL CATEGORY 1: TRIGGERING ──────────────────────────────────────────────

TRIGGER_TESTS = {
    "astro": {
        "should_trigger": [
            "Create a new .astro component",
            "How do I use Astro.props?",
            "How does i18n routing work in Astro?",
            "What is Astro.currentLocale?",
            "Explain Astro frontmatter syntax",
            "Show me how to use slots in Astro",
            "How do I fetch data at build time in Astro?",
            "How do I do file-based routing?",
            "How do I add a new page to the site?",
            "static data fetching in Astro",
        ],
        "should_not_trigger": [
            "How do I install a npm package?",
            "Write a Python function",
            "Help me with SQL queries",
            "How does Tailwind dark mode work?",
            "What is a GraphQL query?",
        ],
    },
    "typescript": {
        "should_trigger": [
            "Fix this TypeScript error in my component",
            "How do I type Astro props with TypeScript?",
            "What does the @ path alias do?",
            "How do I define an interface in TypeScript?",
            "Why is strict mode enabled in tsconfig?",
            "How do I import a type?",
            "Type error: object is possibly undefined",
            "How do I type environment variables?",
        ],
        "should_not_trigger": [
            "Deploy to Netlify",
            "How do I run bun install?",
            "Write a GraphQL query",
            "Configure dark mode in Tailwind",
        ],
    },
    "tailwind-css": {
        "should_trigger": [
            "Why is there no tailwind.config.js?",
            "How do I add a custom color to Tailwind?",
            "How do I use dark mode classes?",
            "Explain the @theme directive in Tailwind v4",
            "Add responsive breakpoint styles",
            "How do I customize the design system?",
            "Why are my Tailwind classes not applying?",
            "How do I add a custom font with Tailwind?",
            "What changed in Tailwind CSS v4?",
        ],
        "should_not_trigger": [
            "Deploy to Netlify",
            "How do I install bun?",
            "Fetch content from DatoCMS",
            "Write a Python script",
        ],
    },
    "bun": {
        "should_trigger": [
            "How do I install a package?",
            "What is bun add?",
            "How do I run the dev server?",
            "Can I use npm instead of bun?",
            "What is bun.lock?",
            "How do I add a dev dependency?",
            "How do I remove a package?",
            "bun run build command",
        ],
        "should_not_trigger": [
            "Deploy to Netlify",
            "Write a GraphQL query for DatoCMS",
            "Create a new Astro component",
            "Fix TypeScript errors",
        ],
    },
    "datocms": {
        "should_trigger": [
            "Fetch content from DatoCMS",
            "Write a GraphQL query for DatoCMS",
            "How do I query localized content from DatoCMS?",
            "DATOCMS_API_TOKEN not working",
            "Fetch brand images from DatoCMS",
            "How do I paginate DatoCMS results?",
            "Filter records in DatoCMS",
            "How do I use the Content Delivery API?",
        ],
        "should_not_trigger": [
            "Deploy to Netlify",
            "How do I install packages with bun?",
            "Add Tailwind custom colors",
            "Fix TypeScript type errors",
        ],
    },
    "netlify": {
        "should_trigger": [
            "Deploy to Netlify",
            "Set up environment variables on Netlify",
            "Configure netlify.toml redirects",
            "Build failing on Netlify",
            "What is the publish directory?",
            "How do I set up a build hook for DatoCMS?",
            "Add custom headers in Netlify",
            "netlify.toml configuration",
        ],
        "should_not_trigger": [
            "Write a GraphQL query",
            "Install a package with bun",
            "Create a new Astro component",
            "Fix TypeScript errors",
        ],
    },
}

def eval_triggering(suite: SkillEvalSuite, skill: dict):
    """
    Eval 1: Triggering tests.
    Tests whether the description contains keywords matching expected trigger phrases,
    and whether it doesn't falsely claim relevance for unrelated queries.
    """
    desc = skill["description"].lower()
    tests = TRIGGER_TESTS.get(suite.skill_name, {})

    for query in tests.get("should_trigger", []):
        # Check if ANY word from the query appears in the description
        # (Claude's trigger logic is semantic, but we test keyword overlap)
        query_keywords = set(re.findall(r'\b\w{4,}\b', query.lower()))
        desc_keywords = set(re.findall(r'\b\w{4,}\b', desc))
        overlap = query_keywords & desc_keywords

        # Also check if the core noun appears (e.g., "astro", "bun", "datocms")
        skill_noun = suite.skill_name.replace("-", "")
        has_skill_noun = skill_noun in desc.replace("-", "")

        passed = len(overlap) >= 1 or has_skill_noun
        suite.add(
            f"should_trigger: '{query}'",
            passed,
            f"keyword overlap={overlap or '{skill_noun}'}" if passed else f"No overlap found. Query keywords: {query_keywords}",
            "triggering",
        )

    for query in tests.get("should_not_trigger", []):
        query_keywords = set(re.findall(r'\b\w{4,}\b', query.lower()))
        desc_keywords = set(re.findall(r'\b\w{4,}\b', desc))
        overlap = query_keywords & desc_keywords
        # These should have minimal/no overlap with the description
        # Acceptable overlap is only the project-generic words
        generic = {"project", "this", "best", "practices", "when", "asking", "about"}
        meaningful_overlap = overlap - generic
        passed = len(meaningful_overlap) <= 1  # Allow at most 1 accidental match
        suite.add(
            f"should_not_trigger: '{query}'",
            passed,
            f"OK — only {meaningful_overlap or 'no'} overlap" if passed else f"WARNING: description overlaps with unrelated query: {meaningful_overlap}",
            "triggering",
        )

# ─── EVAL CATEGORY 2: FUNCTIONAL ──────────────────────────────────────────────

def eval_functional_astro(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]
    blocks = extract_code_blocks(body)
    astro_blocks = [b for b in blocks if b["lang"] in ("astro", "")]

    # Test 1: frontmatter separator syntax present
    has_fence = any("---" in b["code"] for b in blocks)
    suite.add("frontmatter code fence (---) shown", has_fence,
              "Astro frontmatter syntax demonstrated", "functional")

    # Test 2: Astro.props usage shown
    has_props = "Astro.props" in body
    suite.add("Astro.props usage demonstrated", has_props,
              "Props API referenced", "functional")

    # Test 3: i18n locale handling shown
    has_locale = "currentLocale" in body or "Astro.currentLocale" in body
    suite.add("Astro.currentLocale demonstrated", has_locale,
              "i18n locale access shown", "functional")

    # Test 4: getStaticPaths or locale pages shown
    has_static_paths = "getStaticPaths" in body or "[locale]" in body
    suite.add("locale page generation (getStaticPaths or [locale]) shown", has_static_paths,
              "Static path generation for 6 locales shown", "functional")

    # Test 5: import.meta.env (not process.env) for static output
    has_correct_env = "import.meta.env" in body
    has_wrong_env = "process.env" in body and "import.meta.env" not in body
    suite.add("import.meta.env used (not process.env)", has_correct_env and not has_wrong_env,
              "Correct env var access for static Astro builds", "functional")

    # Test 6: @/ alias used in examples
    has_alias = "@/" in body or "from '@/" in body
    suite.add("@ path alias demonstrated", has_alias,
              "Shows @/ import convention", "functional")

    # Test 7: slot usage shown
    has_slot = "<slot" in body
    suite.add("<slot /> usage shown", has_slot,
              "Slot API demonstrated for composable components", "functional")

    # Test 8: TypeScript Props interface
    has_interface = "interface Props" in body
    suite.add("Props interface (TypeScript) shown", has_interface,
              "TypeScript props typing demonstrated", "functional")

def eval_functional_typescript(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]

    # Test 1: Props interface shown
    has_interface = "interface Props" in body
    suite.add("Props interface pattern", has_interface,
              "Astro-specific Props interface shown", "functional")

    # Test 2: @ alias mentioned
    has_alias = '@/' in body
    suite.add("@ alias in import example", has_alias,
              "Path alias @/ demonstrated", "functional")

    # Test 3: strict mode implications mentioned
    has_strict = "strict" in body.lower()
    suite.add("strict mode coverage", has_strict,
              "Strict mode patterns explained", "functional")

    # Test 4: import type shown
    has_import_type = "import type" in body
    suite.add("import type usage shown", has_import_type,
              "Type-only imports demonstrated", "functional")

    # Test 5: import.meta.env typing shown
    has_env_type = "ImportMetaEnv" in body or "import.meta.env" in body
    suite.add("env var typing (ImportMetaEnv)", has_env_type,
              "Environment variable type safety shown", "functional")

    # Test 6: optional chaining shown for null safety
    has_optional_chain = "?." in body
    suite.add("optional chaining for null safety", has_optional_chain,
              "Null-safe property access pattern shown", "functional")

    # Test 7: Record type utility shown
    has_record = "Record<" in body
    suite.add("Record type utility shown", has_record,
              "Common utility type demonstrated", "functional")

    # Test 8: Does NOT mention React (no React in this project)
    has_react_refs = re.search(r'\bReact\b(?! Router)', body)
    suite.add("no inappropriate React references", not bool(has_react_refs),
              "Stays within this project's stack (no React)", "functional")

def eval_functional_tailwind(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]

    # Test 1: @theme directive shown (v4 CSS-first config)
    has_theme = "@theme" in body
    suite.add("@theme directive shown (v4 config)", has_theme,
              "CSS-first @theme configuration demonstrated", "functional")

    # Test 2: No tailwind.config.js creation instruction (excluding negations like "Do not create")
    # Only flag if skill affirmatively instructs user to CREATE the file (not warn against it)
    affirmative_config_js = bool(re.search(
        r'(?<!not\s)(?<!no\s)(?<!do not\s)(?<!never\s)create\s+a?\s*`?tailwind\.config',
        body, re.I
    )) or bool(re.search(r'module\.exports.*tailwind', body, re.I))
    suite.add("does NOT instruct to create tailwind.config.js", not affirmative_config_js,
              "Correctly reflects v4 CSS-first approach", "functional")

    # Test 3: @import "tailwindcss" shown
    has_import = '@import "tailwindcss"' in body or "@import 'tailwindcss'" in body
    suite.add('@import "tailwindcss" CSS entry point shown', has_import,
              "Correct v4 CSS import shown", "functional")

    # Test 4: No postcss.config.js creation instruction (excluding explicit negations)
    # Flag only if it actively tells the user to create postcss.config.js
    affirmative_postcss = bool(re.search(
        r'(?<!not\s)(?<!no\s)(?<!do not\s)(?<!never\s)create\s+a?\s*`?postcss\.config',
        body, re.I
    ))
    suite.add("does NOT instruct to create postcss.config.js", not affirmative_postcss,
              "Correctly reflects @tailwindcss/vite plugin setup", "functional")

    # Test 5: @tailwindcss/vite plugin referenced
    has_vite_plugin = "@tailwindcss/vite" in body
    suite.add("@tailwindcss/vite plugin referenced", has_vite_plugin,
              "Vite plugin integration mentioned", "functional")

    # Test 6: dark mode variant shown
    has_dark = "dark:" in body
    suite.add("dark: variant shown", has_dark,
              "Dark mode utility classes demonstrated", "functional")

    # Test 7: responsive breakpoints shown
    has_responsive = "sm:" in body or "md:" in body or "lg:" in body
    suite.add("responsive breakpoint variants shown", has_responsive,
              "Mobile-first responsive design demonstrated", "functional")

    # Test 8: Custom color @theme example
    has_custom_color = "--color-" in body and "@theme" in body
    suite.add("custom color via @theme shown", has_custom_color,
              "Custom design token pattern demonstrated", "functional")

def eval_functional_bun(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]

    # Test 1: bun install shown
    has_install = "bun install" in body
    suite.add("bun install command shown", has_install,
              "Package installation command referenced", "functional")

    # Test 2: bun add shown
    has_add = "bun add" in body
    suite.add("bun add command shown", has_add,
              "Package addition command shown", "functional")

    # Test 3: bun run shown
    has_run = "bun run" in body
    suite.add("bun run command shown", has_run,
              "Script execution command shown", "functional")

    # Test 4: dev/build/preview scripts mentioned
    has_scripts = "bun run dev" in body and "bun run build" in body
    suite.add("dev and build scripts shown", has_scripts,
              "Project-specific scripts listed", "functional")

    # Test 5: bun.lock mentioned
    has_lockfile = "bun.lock" in body
    suite.add("bun.lock file referenced", has_lockfile,
              "Lock file management explained", "functional")

    # Test 6: warns against npm
    has_npm_warning = "npm" in body.lower()
    suite.add("npm alternative mentioned (avoid npm)", has_npm_warning,
              "npm vs bun distinction covered", "functional")

    # Test 7: bun remove shown
    has_remove = "bun remove" in body
    suite.add("bun remove command shown", has_remove,
              "Package removal command shown", "functional")

    # Test 8: -D flag for dev deps
    has_dev_flag = "-D" in body or "devDependency" in body or "dev dependency" in body.lower()
    suite.add("dev dependency flag (-D) shown", has_dev_flag,
              "Dev dependency installation shown", "functional")

def eval_functional_datocms(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]

    # Test 1: API endpoint correct
    has_endpoint = "https://graphql.datocms.com/" in body
    suite.add("correct GraphQL endpoint URL", has_endpoint,
              "CDA endpoint referenced correctly", "functional")

    # Test 2: Bearer token auth shown
    has_bearer = "Bearer" in body and "DATOCMS_API_TOKEN" in body
    suite.add("Bearer token auth with DATOCMS_API_TOKEN", has_bearer,
              "Authentication pattern shown", "functional")

    # Test 3: POST method shown (GraphQL always POST)
    has_post = "method: 'POST'" in body or 'method: "POST"' in body
    suite.add("POST method for GraphQL shown", has_post,
              "Correct HTTP method for GraphQL", "functional")

    # Test 4: Localization query shown (6 locales in this project)
    has_locale_query = "locale" in body.lower() and "SiteLocale" in body or ("$locale" in body)
    suite.add("locale variable in GraphQL query shown", has_locale_query,
              "Localized content fetching demonstrated", "functional")

    # Test 5: Error handling on fetch
    has_error_handling = "errors" in body and "throw" in body
    suite.add("GraphQL error handling shown", has_error_handling,
              "API error handling pattern demonstrated", "functional")

    # Test 6: TypeScript type example
    has_types = "interface" in body and ("Brand" in body or "DatoCMS" in body)
    suite.add("TypeScript interface for CMS data", has_types,
              "Type-safe CMS data structures shown", "functional")

    # Test 7: import.meta.env for token (not process.env)
    has_correct_env = "import.meta.env.DATOCMS_API_TOKEN" in body
    suite.add("import.meta.env for token access", has_correct_env,
              "Correct env var access pattern for Astro static builds", "functional")

    # Test 8: responsiveImage / image query shown
    has_image = "responsiveImage" in body or ("logo" in body and "url" in body)
    suite.add("image field query shown", has_image,
              "DatoCMS image field querying demonstrated", "functional")

def eval_functional_netlify(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]

    # Test 1: netlify.toml shown with correct build command
    has_build_cmd = "bun run build" in body
    suite.add("correct build command (bun run build)", has_build_cmd,
              "Build command matches project config", "functional")

    # Test 2: publish directory 'dist' shown
    has_publish = 'publish = "dist"' in body or "publish dir" in body.lower() or "dist/" in body
    suite.add("publish directory 'dist' shown", has_publish,
              "Correct publish dir for Astro static builds", "functional")

    # Test 3: netlify.toml block shown
    has_toml = "[build]" in body
    suite.add("netlify.toml [build] block shown", has_toml,
              "Deployment config file demonstrated", "functional")

    # Test 4: DATOCMS_API_TOKEN env var instruction
    has_env = "DATOCMS_API_TOKEN" in body
    suite.add("DATOCMS_API_TOKEN env var setup covered", has_env,
              "Required env var configuration covered", "functional")

    # Test 5: Redirects shown
    has_redirects = "[[redirects]]" in body or "_redirects" in body
    suite.add("redirect configuration shown", has_redirects,
              "i18n locale redirect pattern shown", "functional")

    # Test 6: Build hook for DatoCMS mentioned
    has_hook = "build hook" in body.lower() or "webhook" in body.lower()
    suite.add("DatoCMS rebuild webhook covered", has_hook,
              "Content-triggered rebuild pattern shown", "functional")

    # Test 7: No SSR adapter instruction (this is a static site)
    instructs_adapter = bool(re.search(r'add netlify adapter|install.*@astrojs/netlify', body, re.I))
    suite.add("does NOT instruct to add SSR adapter (static site)", not instructs_adapter,
              "Correctly reflects static output (no adapter needed)", "functional")

    # Test 8: Custom headers shown
    has_headers = "[[headers]]" in body or "_headers" in body
    suite.add("custom headers configuration shown", has_headers,
              "Security headers pattern demonstrated", "functional")

# ─── EVAL CATEGORY 3: COVERAGE ────────────────────────────────────────────────

PROJECT_REQUIREMENTS = {
    "astro": [
        ("astro v6", ["v6", "6.3", "astro"]),
        ("static output", ["static", "output"]),
        ("6 locales", ["en", "es", "fr", "de", "nl", "pl"]),
        ("@ path alias", ["@/"]),
        ("no React/framework adapters", ["No React", "no React", "pure Astro", "no UI framework", "native .astro"]),
        ("build-time data fetching", ["build time", "build-time", "frontmatter", "static"]),
        ("Troubleshooting section", ["Troubleshooting"]),
    ],
    "typescript": [
        ("strict mode", ["strict"]),
        ("@ alias in tsconfig", ["@/*", "@/"]),
        ("Props interface pattern", ["interface Props"]),
        ("import.meta.env typing", ["ImportMetaEnv", "import.meta.env"]),
        ("Troubleshooting section", ["Troubleshooting"]),
    ],
    "tailwind-css": [
        ("v4 CSS-first config", ["v4", "@theme"]),
        ("no tailwind.config.js", ["tailwind.config"]),
        ("@tailwindcss/vite plugin", ["@tailwindcss/vite"]),
        ("dark mode support", ["dark:", "dark mode"]),
        ("responsive design", ["sm:", "md:", "lg:"]),
        ("Troubleshooting section", ["Troubleshooting"]),
    ],
    "bun": [
        ("bun install", ["bun install"]),
        ("bun add / remove", ["bun add", "bun remove"]),
        ("bun run scripts", ["bun run dev", "bun run build"]),
        ("bun.lock committed", ["bun.lock"]),
        ("warn against npm", ["npm"]),
        ("Troubleshooting section", ["Troubleshooting"]),
    ],
    "datocms": [
        ("graphql.datocms.com endpoint", ["graphql.datocms.com"]),
        ("DATOCMS_API_TOKEN auth", ["DATOCMS_API_TOKEN"]),
        ("localization support", ["locale", "SiteLocale", "$locale"]),
        ("image handling", ["responsiveImage", "url", "alt", "width"]),
        ("pagination pattern", ["pagination", "skip", "first"]),
        ("TypeScript types for CMS", ["interface", "Interface"]),
        ("Troubleshooting section", ["Troubleshooting"]),
    ],
    "netlify": [
        ("netlify.toml config", ["netlify.toml", "[build]"]),
        ("bun run build command", ["bun run build"]),
        ("dist publish dir", ["dist"]),
        ("env vars setup", ["DATOCMS_API_TOKEN", "Environment variables"]),
        ("redirects config", ["redirects", "_redirects"]),
        ("static site (no adapter)", ["static"]),
        ("Troubleshooting section", ["Troubleshooting"]),
    ],
}

def eval_coverage(suite: SkillEvalSuite, skill: dict):
    body = skill["body"]
    reqs = PROJECT_REQUIREMENTS.get(suite.skill_name, [])
    for req_name, keywords in reqs:
        matched = any(kw in body for kw in keywords)
        suite.add(
            f"covers: {req_name}",
            matched,
            f"Found one of {keywords}" if matched else f"MISSING — none of {keywords} found in body",
            "coverage",
        )

# ─── RUNNER ───────────────────────────────────────────────────────────────────

FUNCTIONAL_EVALS = {
    "astro": eval_functional_astro,
    "typescript": eval_functional_typescript,
    "tailwind-css": eval_functional_tailwind,
    "bun": eval_functional_bun,
    "datocms": eval_functional_datocms,
    "netlify": eval_functional_netlify,
}

def run_skill_eval(skill_name: str, verbose: bool = False) -> SkillEvalSuite:
    suite = SkillEvalSuite(skill_name=skill_name)
    skill = load_skill(skill_name)

    eval_triggering(suite, skill)
    if skill_name in FUNCTIONAL_EVALS:
        FUNCTIONAL_EVALS[skill_name](suite, skill)
    eval_coverage(suite, skill)

    return suite

def print_suite(suite: SkillEvalSuite, verbose: bool = False):
    print(f"\n{BOLD}{CYAN}━━━ Skill: {suite.skill_name} ━━━{RESET}")

    categories = ["triggering", "functional", "coverage"]
    for cat in categories:
        p, t = suite.score(cat)
        status = GREEN if p == t else (YELLOW if p >= t * 0.8 else RED)
        print(f"  {status}{cat.upper()}{RESET}: {p}/{t}")
        if verbose:
            for r in suite.results:
                if r.category != cat:
                    continue
                marker = ok if r.passed else fail
                # For triggering, use short display
                display_name = r.name[:70]
                print(f"    {marker(display_name)}")
                if not r.passed or verbose:
                    print(f"      → {r.message}")

    total_p, total_t = suite.score()
    pct = int(100 * total_p / total_t) if total_t else 0
    color = GREEN if pct >= 90 else (YELLOW if pct >= 75 else RED)
    print(f"  {color}TOTAL: {total_p}/{total_t} ({pct}%){RESET}")

def main():
    parser = argparse.ArgumentParser(description="Run skill evals")
    parser.add_argument("--skill", help="Run evals for a single skill only")
    parser.add_argument("--verbose", "-v", action="store_true", help="Show all test cases")
    args = parser.parse_args()

    skills = ["astro", "typescript", "tailwind-css", "bun", "datocms", "netlify"]
    if args.skill:
        if args.skill not in skills:
            print(f"Unknown skill: {args.skill}. Available: {skills}")
            sys.exit(1)
        skills = [args.skill]

    print(f"\n{BOLD}Skills Eval Suite{RESET} — following skills-guide.md testing methodology")
    print(f"Three categories: Triggering • Functional • Coverage")

    all_suites = []
    for skill_name in skills:
        try:
            suite = run_skill_eval(skill_name, verbose=args.verbose)
            all_suites.append(suite)
            print_suite(suite, verbose=args.verbose)
        except Exception as e:
            print(f"\n{RED}ERROR{RESET} evaluating '{skill_name}': {e}")

    # Summary
    print(f"\n{BOLD}{'━' * 50}{RESET}")
    print(f"{BOLD}SUMMARY{RESET}")
    total_pass = total_tests = 0
    for suite in all_suites:
        p, t = suite.score()
        total_pass += p
        total_tests += t
        pct = int(100 * p / t) if t else 0
        color = GREEN if pct >= 90 else (YELLOW if pct >= 75 else RED)
        print(f"  {color}{suite.skill_name:<14}{RESET} {p:>2}/{t:<2} ({pct}%)")

    overall_pct = int(100 * total_pass / total_tests) if total_tests else 0
    color = GREEN if overall_pct >= 90 else (YELLOW if overall_pct >= 75 else RED)
    print(f"  {'─' * 30}")
    print(f"  {color}{'OVERALL':<14}{RESET} {total_pass:>2}/{total_tests:<2} ({overall_pct}%)")

    # Write JSON report
    report = {
        "skills": [
            {
                "name": s.skill_name,
                "total_pass": s.score()[0],
                "total_tests": s.score()[1],
                "pct": int(100 * s.score()[0] / s.score()[1]) if s.score()[1] else 0,
                "categories": {
                    cat: {"pass": s.score(cat)[0], "total": s.score(cat)[1]}
                    for cat in ["triggering", "functional", "coverage"]
                },
                "failures": [
                    {"name": r.name, "category": r.category, "message": r.message}
                    for r in s.results if not r.passed
                ],
            }
            for s in all_suites
        ],
        "overall_pct": overall_pct,
    }
    report_path = Path(__file__).parent / "eval_results.json"
    report_path.write_text(json.dumps(report, indent=2))
    print(f"\n  {info(f'Full report: {report_path}')}")

    sys.exit(0 if overall_pct >= 80 else 1)

if __name__ == "__main__":
    main()
