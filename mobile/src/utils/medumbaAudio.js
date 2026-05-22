import * as Speech from 'expo-speech';

/* ═══════════════════════════════════════════════════════════════
   medumbaAudio.js
   Phonetic engine for Medumba language (1144 syllables)
   Source: "Les syllabes medumba.docx"

   Pipeline: Medumba orthography → IPA → French TTS approximation
═══════════════════════════════════════════════════════════════ */

/* ── Syllable table: Medumba → IPA ─────────────────────────────
   Built from the full 1144-syllable inventory.
   Longest matches first (greedy left-to-right parsing).
   Key: lowercase medumba syllable | Value: IPA string
──────────────────────────────────────────────────────────────── */
const SYLLABLE_IPA = {
  /* ── NTS clusters ── */
  'ntsiaŋ': 'ntsiaŋ', 'ntsiα': 'ntsiɑ', 'ntsiαg': 'ntsiɑk',
  'ntswə': 'ntsuœ', "ntswə'": 'ntsuœʔ', 'ntsi': 'ntsi',
  'ntsia': 'ntsia', 'ntsə': 'ntsœ', "ntsə'": 'ntsœʔ',

  /* ── NSH clusters ── */
  'nshu': 'nʃu', 'nshun': 'nʃun', "nshu'": 'nʃuʔ',
  "nsh'ʉ": 'nʃʉ', "nsh'ʉn": 'nʃʉn', "nsh'ʉ'": 'nʃʉʔ',
  'nshʉ': 'nʃʉ', "nshʉ'": 'nʃʉʔ',

  /* ── NZW clusters ── */
  'nzwiaŋ': 'nzhɥiaŋ', 'nzwiα': 'nzhɥiɑ', 'nzwiαg': 'nzhɥiɑk',
  'nzwid': 'nzhɥit', 'nzwil': 'nzhɥil', 'nzwim': 'nzhɥim',
  "nzwi'": 'nzhɥiʔ', 'nzwi': 'nzhɥi', "nzwə'": 'nzhuœʔ', 'nzwə': 'nzhuœ',

  /* ── NZI clusters ── */
  'nziag': 'nzhiak', 'nzia': 'nzhia', 'nzib': 'nzhib', 'nzid': 'nzhit',
  'nzil': 'nzhil', 'nzim': 'nzhim', 'nzin': 'nzhin', "nzi'": 'nzhiʔ',
  'nzi': 'nzhi', "nzə'": 'nzhœʔ', 'nzə': 'nzhœ',

  /* ── NKW clusters ── */
  'nkwiaŋ': 'ŋkxɥiaŋ', 'nkwiα': 'ŋkxɥiɑ', 'nkwiαg': 'ŋkxɥiɑk',
  'nkwia': 'ŋkxɥia', 'nkwib': 'ŋkxɥib', 'nkwid': 'ŋkxɥit',
  'nkwil': 'ŋkxɥil', 'nkwim': 'ŋkxɥim', 'nkwin': 'ŋkxɥin',
  "nkwi'": 'ŋkxɥiʔ', 'nkwi': 'ŋkxɥi', 'nkwαb': 'ŋkuɑb',
  'nkwα': 'ŋkuɑ', 'nkwag': 'ŋkuak', 'nkwad': 'ŋkuat',
  "nkwe'": 'ŋkɥiʔ', 'nkweb': 'ŋkɥib', 'nkwem': 'ŋkɥim',
  'nkwe': 'ŋkɥi', "nkw'ʉ": 'ŋkxuʉ', 'nkwʉ': 'ŋkxuʉ',
  'nkwa': 'ŋkua',

  /* ── NCW clusters ── */
  'ncwed': 'ntʃɥit', 'ncwel': 'ntʃɥil', 'ncwem': 'ntʃɥim',
  "ncwe'": 'ntʃɥiʔ', 'ncwe': 'ntʃɥi', 'ncwad': 'ntʃuad', 'ncwa': 'ntʃua',

  /* ── NJW clusters ── */
  'njwed': 'ndȝuit', 'njwel': 'ndȝuil', 'njwem': 'ndȝuim',
  "njwe'": 'ndȝuiʔ', 'njwe': 'ndȝui', 'njwɛd': 'ndȝuɛt',
  'njwɛl': 'ndȝuɛl', 'njwɛn': 'ndȝuɛn', 'njwɛ': 'ndȝuɛ',

  /* ── MBW clusters ── */
  "mbwə'": 'mbhœʔ', 'mbwə': 'mbhœ', 'mbwoŋ': 'mbhɔŋ',
  'mbwog': 'mbhɔk', 'mbwɔ': 'mbho',

  /* ── MFW clusters ── */
  "mf'ʉα": 'mfhʉɑ', 'mfʉαg': 'mfhʉɑk', 'mfʉα': 'mfhʉɑ',
  "mfʉ'": 'mfhʉʔ', 'mfʉn': 'mfhʉn', 'mfʉl': 'mfhʉl',
  'mfʉd': 'mfhʉt', 'mfʉ': 'mfhʉ', "mfu'": 'mfhuʔ',
  'mfub': 'mfhub', 'mfu': 'mfhu',
  'mfoŋ': 'mfhɔŋ', 'mfog': 'mfhɔk',
  "mfi'": 'mfhiʔ', 'mfin': 'mfhin', 'mfim': 'mfhim',
  'mfil': 'mfhil', 'mfid': 'mfhid', 'mfiαg': 'mfhiɑk',
  'mfiα': 'mfhiɑ', 'mfia': 'mfhia', 'mfi': 'mfhi',
  "mfə'": 'mfhœʔ', 'mfəm': 'mvʉm', 'mfən': 'mvʉn',
  'mfəl': 'mvʉl', 'mfəd': 'mvʉt', 'mfəb': 'mvʉb',
  'mfə': 'mvʉ', "mfe'": 'mviʔ', 'mfem': 'mvim',
  'mfed': 'mvit', 'mfel': 'mvil', 'mfeb': 'mvib', 'mfe': 'mvi',
  'mfɛn': 'mvɛ', 'mfɛl': 'mvɛl', 'mfɛd': 'mvɛt', 'mfɛ': 'mvɛ',
  'mfαn': 'mvɑn', 'mfαb': 'mvɑb', 'mfα': 'mvɑ',
  "mfa'": 'mvɑʔ', 'mfaŋ': 'mvaŋ', 'mfam': 'mvam',
  'mfal': 'mval', 'mfag': 'mvak', 'mfad': 'mvat', 'mfa': 'mva',

  /* ── MVW clusters ── */
  "mvə'": 'mvʉʔ', 'mvə': 'mvhœ', 'mvɛn': 'mvɛn', 'mvɛd': 'mvɛt',
  'mvoŋ': 'mvhɔŋ', 'mvog': 'mvhɔk', "mv'ʉ": 'mvhʉ', 'mvʉ': 'mvhʉ',
  'mvaŋ': 'mvaŋ',

  /* ── NGW clusters ── */
  'ngwaŋ': 'ŋguaŋ', 'ngwal': 'ŋgual', 'ngwag': 'ŋguak',
  'ngwad': 'ŋguat', 'ngwa': 'ŋgua',

  /* ── KWI clusters ── */
  'kwiaŋ': 'kxɥiaŋ', 'kwiα': 'kxɥiɑ', 'kwiαg': 'kxɥiɑk',
  'kwia': 'kxɥia', 'kwib': 'kxɥib', 'kwid': 'kxɥit',
  'kwim': 'kxɥim', 'kwin': 'kxɥin', "kwi'": 'kxɥiʔ',
  'kwi': 'kxɥi', 'kwαb': 'kuɑb', 'kwα': 'kuɑ',
  "kwe'": 'kɥiʔ', 'kweb': 'kɥib', 'kwem': 'kɥim', 'kwe': 'kɥi',
  'kwag': 'kuak', 'kwaŋ': 'kuaŋ', 'kwa': 'kua',
  "kw'ʉ": 'kxuʉ', 'kwʉ': 'kxuʉ',

  /* ── CWA clusters ── */
  'cwad': 'tʃuat', 'cwag': 'tʃuak', 'cwa': 'tʃua',
  'cwɛd': 'tʃuɛt', 'cwɛl': 'tʃuɛl', 'cwɛn': 'tʃuɛn', 'cwɛ': 'tʃuɛ',
  'cwed': 'tʃɥit', 'cwel': 'tʃɥil', 'cwem': 'tʃɥim',
  'cwen': 'tʃɥin', "cwe'": 'tʃɥiʔ', 'cwe': 'tʃɥi',

  /* ── SWA clusters ── */
  'swad': 'suat', 'swal': 'sual', 'swa': 'sua',
  'swɛd': 'suɛt', 'swɛl': 'suɛl', 'swɛn': 'suɛn', 'swɛ': 'suɛ',
  "swə'": 'shuœʔ', 'swə': 'shuœ',

  /* ── NSW clusters ── */
  'nswad': 'nzuat', 'nswal': 'nzual', 'nswa': 'nzua',
  'nswɛd': 'nzuɛt', 'nswɛl': 'nzuɛl', 'nswɛn': 'nzuɛn', 'nswɛ': 'nzuɛ',
  "nswə'": 'nshuœʔ', 'nswə': 'nshuœ',

  /* ── NSI clusters ── */
  'nsiaŋ': 'nshiaŋ', 'nsiα': 'nshiɑ', 'nsiαg': 'nshiɑk',
  'nsia': 'nshia', 'nsin': 'nshin', 'nsi': 'nshi',

  /* ── TWA/TSW clusters ── */
  "tswə'": 'tsuœʔ', 'tswə': 'tsuœ',
  'tsiaŋ': 'tsiaŋ', 'tsiα': 'tsiɑ', 'tsiαg': 'tsiɑg',
  'tsia': 'tsia', "tsi'": 'tsiʔ', 'tsin': 'tsin',
  'tsil': 'tsil', 'tsid': 'tsit', 'tsi': 'tsi',
  "tsə'": 'tsœʔ', 'tsə': 'tsœ',

  /* ── NTW clusters ── */
  'ntiαg': 'ntiɑk', 'ntiα': 'ntiɑ',

  /* ── YW clusters ── */
  'ywɛd': 'juɛt', 'ywɛl': 'juɛl', 'ywɛn': 'juɛn', 'ywɛ': 'juɛ',
  'ywid': 'jɥit', 'ywil': 'jɥil', 'ywim': 'jɥim', "ywi'": 'jɥiʔ',
  'ywi': 'jɥi', 'ywe': 'jui',

  /* ── NYW clusters ── */
  'nywid': 'ɲɥit', 'nywil': 'ɲɥil', 'nywin': 'ɲɥin', "nywi'": 'ɲɥiʔ',
  'nywi': 'ɲɥi',

  /* ── ŊW clusters ── */
  "ŋwα'": 'ŋuɑʔ', 'ŋwαb': 'ŋuɑb', 'ŋwα': 'ŋuɑ',
  'ŋwaŋ': 'ŋuaŋ', 'ŋwag': 'ŋuak', 'ŋwad': 'ŋuat', "ŋwa'": 'ŋuaʔ',
  'ŋwa': 'ŋua', 'ŋwid': 'ŋɥit', 'ŋwil': 'ŋɥil',
  'ŋwin': 'ŋɥin', 'ŋwi': 'ŋɥi', "ŋw'ʉ": 'ŋuʉ', 'ŋwʉ': 'ŋuʉ',

  /* ── GH clusters ── */
  "ghʉ'": 'ghʉʔ', 'ghʉn': 'ghʉn', 'ghʉm': 'ghʉm',
  'ghʉd': 'ghʉt', 'ghʉα': 'ghʉɑ', "ghʉa": 'ghʉa',
  'ghʉaŋ': 'ghʉaŋ', 'ghʉ': 'ghʉ',
  "ghu'": 'ghuʔ', 'ghuαn': 'ghuɑn', 'ghuα': 'ghuɑ',
  "ghua'": 'ghuɑʔ', 'ghub': 'ghub', 'ghu': 'ghu',
  'ghɔ': 'gho', "gho'": 'ghuʔ', 'ghon': 'ghun',
  'ghom': 'ghum', 'ghog': 'ghɔk', 'ghob': 'ghub', 'gho': 'ghu',
  "ghə'": 'ghʉʔ', 'ghəm': 'ghʉm', 'ghəl': 'ghʉl',
  'ghəd': 'ghʉt', 'ghəb': 'ghʉb', 'ghə': 'ghʉ',
  'ghαb': 'ghɑb', 'ghα': 'ghɑ', "gha'": 'ghɑʔ',
  'ghaŋ': 'ghaŋ', 'gham': 'gham', 'ghag': 'ghak',
  'ghad': 'ghat', 'ghab': 'ghab', 'gha': 'gha',

  /* ── MB clusters ── */
  "mbʉ'": 'mbhʉʔ', 'mbʉn': 'mbhʉn', 'mbʉm': 'mbhʉm',
  'mbʉαg': 'mbhʉɑk', 'mbʉα': 'mbhʉɑ', 'mbʉ': 'mbhʉ',
  "mbu'": 'mbhuʔ', 'mbun': 'mbhun', 'mbum': 'mbhum',
  'mbul': 'mbhul', 'mbub': 'mbhub', 'mbu': 'mbhu',
  "mbo'": 'mbuʔ', 'mboŋ': 'mbɔŋ', 'mbod': 'mbut',
  'mbob': 'mbub', 'mbo': 'mbu', 'mbɔ': '—',
  "mbi'": 'mbhiʔ', 'mbiαg': 'mbhiɑk', 'mbiα': 'mbhiɑ',
  "mbia'": 'mbhiaʔ', 'mbia': 'mbhia', 'mbid': 'mbhit',
  'mbil': 'mbhil', 'mbi': 'mbhi', 'mbɛn': 'mbɛn',
  'mbɛl': 'mbɛl', 'mbɛd': 'mbɛt', 'mbɛ': 'mbɛ',
  "mbe'": 'mbiʔ', 'mben': 'mbin', 'mbem': 'mbim',
  'mbel': 'mbil', 'mbed': 'mbit', 'mbe': 'mbi',
  "mbə'": 'mbʉʔ', 'mbəm': 'mbʉm', 'mbəl': 'mbʉl',
  'mbəd': 'mbʉt', 'mbə': 'mbʉ', 'mbαn': 'mbɑn',
  'mbαm': 'mbɑm', 'mbαg': 'mbɑk', 'mbαb': 'mbɑb',
  'mbα': 'mbɑ', "mba'": 'mbɑʔ', 'mbaŋ': 'mbaŋ',
  'mbam': 'mbam', 'mbal': 'mbal', 'mbag': 'mbak',
  'mbad': 'mbat', 'mbab': 'mbab', 'mba': 'mba',

  /* ── NG clusters ── */
  "ngʉ'": 'ŋghʉʔ', 'ngʉn': 'ŋghʉn', 'ngʉm': 'ŋghʉm',
  'ngʉα': 'ŋghʉɑ', 'ngʉ': 'ŋghʉ',
  "ngu'": 'ŋghuʔ', 'nguαn': 'ŋghuɑn', 'nguα': 'ŋghuɑ',
  'ngub': 'ŋghub', 'ngum': 'ŋghum', 'ngu': 'ŋghu',
  'ngɔ': 'ŋgo', "ngo'": 'ŋguʔ', 'ngon': 'ŋgun',
  'ngom': 'ŋgum', 'ngoŋ': 'ŋgɔŋ', 'ngob': 'ŋgub', 'ngo': 'ŋgu',
  "ngə'": 'ŋgʉʔ', 'ngəm': 'ŋgʉm', 'ngəl': 'ŋgʉl',
  'ngəd': 'ŋgʉt', 'ngəb': 'ŋgʉb', 'ngə': 'ŋgʉ',
  'ngαn': 'ŋgɑn', 'ngαm': 'ŋgɑm', 'ngαb': 'ŋgɑb',
  "nga'": 'ŋgɑʔ', 'ngaŋ': 'ŋgaŋ', 'ngam': 'ŋgam',
  'ngal': 'ŋgal', 'ngag': 'ŋgak', 'ngad': 'ŋgat',
  'ngab': 'ŋgab', 'nga': 'ŋga',

  /* ── NK clusters ── */
  "nkʉ'": 'ŋkxʉʔ', 'nkʉn': 'ŋkxʉn', 'nkʉm': 'ŋkxʉm',
  'nkʉl': 'ŋkxʉl', 'nkʉd': 'ŋkxʉt', 'nkʉα': 'ŋkxʉɑ',
  'nkʉ': 'ŋkxʉ', "nku'": 'ŋkxuʔ', 'nkun': 'ŋkxun',
  'nkum': 'ŋkxum', 'nkul': 'ŋkxul', 'nkud': 'ŋkxut',
  'nkub': 'ŋkxub', 'nkuα': 'ŋkxuɑ', 'nku': 'ŋkxu',
  'nkɔ': 'ŋko', "nko'": 'ŋkuʔ', 'nkoŋ': 'ŋkɔŋ',
  'nkom': 'ŋkum', 'nkol': 'ŋkul', 'nkod': 'ŋkut',
  'nkob': 'ŋkub', 'nkog': 'ŋkɔk', 'nkioŋ': 'ŋkiɔŋ',
  "nke'": 'ŋkiʔ', 'nkem': 'ŋkim', 'nkel': 'ŋkil',
  'nked': 'ŋkit', 'nke': 'ŋki', "nkə'": 'ŋkʉʔ',
  'nkəm': 'ŋkʉm', 'nkəl': 'ŋkʉl', 'nkəd': 'ŋkʉt',
  'nkəb': 'ŋkʉb', 'nkə': 'ŋkʉ', 'nkαn': 'ŋkɑn',
  'nkαm': 'ŋkɑm', 'nkαg': 'ŋkɑk', 'nkαb': 'ŋkɑb',
  'nkα': 'ŋkɑ', "nka'": 'ŋkɑʔ', 'nkaŋ': 'ŋkaŋ',
  'nkam': 'ŋkam', 'nkal': 'ŋkal', 'nkag': 'ŋkak',
  'nkad': 'ŋkat', 'nkab': 'ŋkab', 'nka': 'ŋka',

  /* ── ND clusters ── */
  "ndʉ'": 'ndhʉʔ', 'ndʉm': 'ndhʉm', 'ndʉb': 'ndhʉb',
  'ndʉ': 'ndhʉ', "ndu'": 'ndhuʔ', 'ndun': 'ndhun',
  'ndum': 'ndhum', 'ndul': 'ndhul', 'ndud': 'ndhut',
  'ndub': 'ndhub', 'ndu': 'ndhu', 'ndɔ': 'ndo',
  "ndo'": 'nduʔ', 'ndon': 'ndun', 'ndod': 'ndut',
  'ndob': 'ndub', 'ndoŋ': 'ndɔŋ', 'ndo': 'ndu',
  'ndɛn': 'ndɛn', 'ndɛl': 'ndɛl', 'ndɛd': 'ndɛt', 'ndɛ': 'ndɛ',
  "nde'": 'ndiʔ', 'ndem': 'ndim', 'ndel': 'ndil',
  'nded': 'ndit', 'ndeb': 'ndib', 'nde': 'ndi',
  "ndə'": 'ndʉʔ', 'ndəm': 'ndʉm', 'ndəl': 'ndʉl',
  'ndəd': 'ndʉt', 'ndəb': 'ndʉb', 'ndə': 'ndʉ',
  'ndαn': 'ndɑn', 'ndαm': 'ndɑm', 'ndαg': 'ndɑk',
  'ndαb': 'ndɑb', 'ndα': 'ndɑ', "nda'": 'ndɑʔ',
  'ndaŋ': 'ndaŋ', 'ndam': 'ndam', 'ndal': 'ndal',
  'ndag': 'ndak', 'ndad': 'ndat', 'ndab': 'ndab', 'nda': 'nda',

  /* ── NC clusters ── */
  "ncʉ'": 'ntʃhʉʔ', 'ncʉm': 'ntʃhʉm', 'ncʉb': 'ntʃhʉb',
  'ncʉaŋ': 'ntʃhʉaŋ', 'ncʉa': 'ntʃhʉa', 'ncʉα': 'ntʃhʉɑ',
  'ncʉαg': 'ntʃhɑk', 'ncʉ': 'ntʃhʉ',
  "ncu'": 'ntʃhuʔ', 'ncuα': 'ntʃhuɑ', "ncua'": 'ntʃhuaʔ',
  'ncub': 'ntʃhub', 'ncum': 'ntʃhm', 'ncu': 'ntʃhu',
  "nco'": 'ntʃuʔ', 'ncoŋ': 'ntʃɔŋ', 'ncom': 'ntʃum',
  'ncog': 'ntʃɔk', 'ncob': 'ntʃub', 'nco': 'ntʃu',
  'ncɛn': 'ntʃɛn', 'ncɛl': 'ntʃɛl', 'ncɛd': 'ntʃɛt', 'ncɛ': 'ntʃɛ',
  "nce'": 'ntʃiʔ', 'ncem': 'ntʃim', 'ncel': 'ntʃil',
  'nced': 'ntʃit', 'nce': 'ntʃi',
  "ncə'": 'ntʃʉʔ', 'ncəm': 'ntʃʉm', 'ncəl': 'ntʃʉl',
  'ncəd': 'ntʃʉt', 'ncəb': 'ntʃʉb', 'ncə': 'ntʃʉ',
  'ncαm': 'ntʃɑm', 'ncαg': 'ntʃɑg', 'ncαb': 'ntʃɑb',
  'ncα': 'ntʃɑ', "nca'": 'ntʃɑʔ', 'ncaŋ': 'ntʃaŋ',
  'ncam': 'ntʃam', 'ncag': 'ntʃak', 'ncab': 'ntʃab', 'nca': 'ntʃa',

  /* ── NS clusters ── */
  "nsə'": 'nshœʔ', 'nsəm': 'nzʉm', 'nsəl': 'nzʉl',
  'nsəd': 'nzʉt', 'nsəb': 'nzʉb', 'nsə': 'nzʉ',
  'nsɛn': 'nzɛn', 'nsɛ': 'nzɛ', "nse'": 'nziʔ',
  'nsem': 'nzim', 'nseb': 'nzib', 'nse': 'nzi',
  'nsαm': 'nzɑm', 'nsαg': 'nzɑk', 'nsαb': 'nzɑb',
  'nsα': 'nzɑ', "nsa'": 'nzaʔ', 'nsaŋ': 'nzaŋ',
  'nsam': 'nzam', 'nsal': 'nzal', 'nsag': 'nzag',
  'nsad': 'nzat', 'nsab': 'nzab', 'nsa': 'nza',
  "nso'": 'nzu', 'nsoŋ': 'nshɔŋ', 'nsom': 'nzum',
  'nsog': 'nshɔk', 'nsob': 'nzub', 'nso': 'nzu', 'nsɔ': 'nzo',
  'nsiaŋ': 'nshiaŋ',

  /* ── NT clusters ── */
  "ntʉ'": 'nthʉʔ', 'ntʉn': 'nthʉn', 'ntʉ': 'nthʉ',
  "ntu'": 'nthuʔ', 'ntun': 'nthun', 'ntum': 'nthum',
  'ntul': 'nthul', 'ntud': 'nthut', 'ntub': 'nthub', 'ntu': 'nthu',
  'ntɔ': 'nto', "nto'": 'ntuʔ', 'nton': 'ntun',
  'ntom': 'ntum', 'ntol': 'ntul', 'ntod': 'ntut',
  'ntob': 'ntub', 'ntog': 'ntɔk', 'nto': 'ntu',
  'ntɛn': 'ntɛn', 'ntɛl': 'ntɛl', 'ntɛd': 'ntɛt', 'ntɛ': 'ntɛ',
  "ntə'": 'ntʉʔ', 'ntən': 'ntʉn', 'ntəm': 'ntʉm',
  'ntəd': 'ntʉt', 'ntə': 'ntʉ', 'ntαn': 'ntɑn',
  'ntαm': 'ntɑm', 'ntαg': 'ntɑk', 'ntαb': 'ntɑb',
  'ntα': 'ntɑ', "nta'": 'ntaʔ', 'ntaŋ': 'ntaŋ',
  'ntam': 'ntam', 'ntag': 'ntak', 'ntad': 'ntat',
  'ntab': 'ntab', 'nta': 'nta',

  /* ── NJ clusters ── */
  "njʉ'": 'nȝʉʔ', 'njʉm': 'nȝʉm', 'njʉαg': 'nȝʉɑk',
  'njʉα': 'nȝʉɑ', 'njʉ': 'nȝʉ',
  "nju'": 'nȝuʔ', 'njun': 'nȝun', 'njum': 'nȝum',
  'njub': 'nȝub', 'nju': 'nȝu', 'njɔ': 'ndȝo',
  "njo'": 'ndȝuʔ', 'njoŋ': 'ndȝɔŋ', 'njom': 'ndȝum',
  'njol': 'ndȝul', 'njog': 'ndȝɔk', 'njod': 'ndȝut',
  'njob': 'ndȝub', 'njo': 'ndȝu', 'njαm': 'ndȝɑm',
  'njαg': 'ndȝɑk', 'njαb': 'ndȝɑb', 'njα': 'ndȝɑ',

  /* ── NY clusters ── */
  "nyu'": 'ɲuʔ', 'nyun': 'ɲun', 'nyu': 'ɲu',
  'nyɔ': 'ɲo', "nyi'": 'ɲiʔ', 'nyin': 'ɲin',
  'nyil': 'ɲil', 'nyid': 'ɲit', 'nyi': 'ɲi',
  'nyαm': 'ɲɑm', 'nyα': 'ɲɑ', "nya'": 'ɲaʔ',
  'nyaŋ': 'ɲaŋ', 'nyam': 'ɲam', 'nyal': 'ɲal',
  'nyag': 'ɲak', 'nyad': 'ɲat', 'nya': 'ɲa',

  /* ── Single-consonant syllables ── */
  /* C [tʃ] */
  "cʉ'": 'tʃhʉʔ', 'cʉm': 'tʃhʉm', 'cʉb': 'tʃhʉb',
  'cʉα': 'tʃhʉɑ', 'cʉ': 'tʃhʉ',
  "cu'": 'tʃhuʔ', 'cul': 'tʃhul', 'cum': 'tʃhum',
  'cub': 'tʃhub', 'cu': 'tʃhu',
  "co'": 'tʃuʔ', 'coŋ': 'tʃɔŋ', 'com': 'tʃum',
  'cog': 'tʃɔk', 'cob': 'tʃub', 'co': 'tʃu', 'cɔ': 'tʃo',
  'cɛn': 'tʃɛn', 'cɛl': 'tʃɛl', 'cɛd': 'tʃɛt', 'cɛ': 'tʃɛ',
  "ce'": 'tʃiʔ', 'cem': 'tʃim', 'cel': 'tʃil',
  'ced': 'tʃit', 'ce': 'tʃi',
  "cə'": 'tʃʉʔ', 'cən': 'tʃʉn', 'cəm': 'tʃʉm',
  'cəl': 'tʃʉl', 'cəd': 'tʃʉt', 'cəb': 'tʃʉb', 'cə': 'tʃʉ',
  'cαm': 'tʃɑm', 'cαg': 'tʃɑk', 'cαb': 'tʃɑb',
  'cα': 'tʃɑ', "ca'": 'tʃɑʔ', 'caŋ': 'tʃaŋ',
  'cam': 'tʃam', 'cag': 'tʃak', 'cab': 'tʃab', 'ca': 'tʃa',

  /* B */
  "bʉ'": 'bhʉʔ', 'bʉn': 'bhʉn', 'bʉaŋ': 'bhʉaŋ',
  'bʉα': 'bhʉɑ', 'bʉ': 'bhʉ',
  "bu'": 'bhuʔ', 'bun': 'bhun', 'bum': 'bhum',
  'bul': 'bhul', 'bub': 'bhub', 'bu': 'bhu',
  "bo'": 'buʔ', 'bom': 'bum', 'bon': 'bun',
  'bol': 'bul', 'bob': 'bub', 'bod': 'but', 'bo': 'bu', 'bɔ': 'bo',
  "bi'": 'bhiʔ', 'biaŋ': 'bhiaŋ', 'biα': 'bhiɑ',
  'biαg': 'bhiɑk', 'bia': 'bhia', 'bin': 'bhin',
  'bil': 'bhil', 'bid': 'bhit', 'bib': 'bhib', 'bi': 'bhi',
  'bɛn': 'bɛn', 'bɛl': 'bɛl', 'bɛd': 'bɛt', 'bɛ': 'bɛ',
  "be'": 'biʔ', 'ben': 'bin', 'bem': 'bim',
  'bel': 'bil', 'bed': 'bit', 'beb': 'bib', 'be': 'bi',
  "bə'": 'bʉʔ', 'bən': 'bʉn', 'bəm': 'bʉm',
  'bəl': 'bʉl', 'bəd': 'bʉt', 'bə': 'bʉ',
  'bαn': 'bɑn', 'bαm': 'bɑm', 'bαg': 'bɑg',
  'bαb': 'bɑb', 'bα': 'bɑ', "ba'": 'bɑʔ',
  'baŋ': 'baŋ', 'bam': 'bam', 'bal': 'bal',
  'bag': 'bak', 'bad': 'bat', 'bab': 'bab', 'ba': 'ba',
  'bwə': 'bhœ', "bwə'": 'bhœʔ', 'bwog': 'bhɔg',
  'bwoŋ': 'bhɔŋ', 'bwɔ': 'bho',

  /* D */
  "dʉ'": 'dhʉʔ', 'dʉn': 'dhʉn', 'dʉm': 'dhʉm',
  'dʉl': 'dhʉl', 'dʉd': 'dhʉt', 'dʉb': 'dhʉb', 'dʉ': 'dhʉ',
  "du'": 'dhuʔ', 'dun': 'dhun', 'dum': 'dhum',
  'dul': 'dhul', 'dud': 'dhut', 'dub': 'dhub',
  'duα': 'dhuɑ', 'du': 'dhu',
  'din': 'dzin', 'diα': 'dziɑ', 'dia': 'dzia', 'di': 'dzi',

  /* F */
  "fʉ'": 'fhʉʔ', 'fʉn': 'fhʉn', 'fʉl': 'fhʉl',
  'fʉd': 'fhʉt', 'fʉαg': 'fhʉɑk', 'fʉα': 'fhʉɑ', 'fʉ': 'fhʉ',
  "fu'": 'fhuʔ', 'fub': 'fhub', 'fu': 'fhu',
  'foŋ': 'fhɔŋ', 'fog': 'fhɔk', 'fon': 'fun', 'fom': 'fum',
  'fod': 'fud', 'fo': 'fu', "fi'": 'fhiʔ', 'fiaŋ': 'fhiaŋ',
  'fiαg': 'fhiɑk', 'fiα': 'fhiɑ', 'fia': 'fhia',
  'fin': 'fhin', 'fim': 'fhim', 'fil': 'fhil',
  'fid': 'fhit', 'fib': 'fhib', 'fi': 'fhi',
  'fɛn': 'fɛn', 'fɛl': 'fɛl', 'fɛd': 'fɛt', 'fɛ': 'fɛ',
  "fe'": 'fiʔ', 'fem': 'fim', 'fel': 'fil',
  'feb': 'fib', 'fe': 'fi', "fə'": 'fhœʔ',
  'fən': 'fʉn', 'fəm': 'fʉm', 'fəl': 'fʉl',
  'fəd': 'fʉt', 'fəb': 'fʉb', 'fə': 'fʉ',
  'fαn': 'fɑn', 'fαb': 'fɑb', 'fα': 'fɑ',
  "fa'": 'fɑʔ', 'faŋ': 'faŋ', 'fam': 'fam',
  'fal': 'fal', 'fag': 'fak', 'fad': 'fat', 'fab': 'fab', 'fa': 'fa',

  /* G */
  'gə': 'gœ', 'go': 'gu',

  /* H */
  'hα': 'hɑ', 'həm': 'hʉm', 'hɔ': 'ho',

  /* J */
  "jʉ'": 'ȝʉʔ', 'jʉm': 'ȝʉm', 'jʉαg': 'ȝʉɑk',
  'jʉα': 'ȝʉɑ', 'jʉ': 'ȝʉ',
  "ju'": 'ȝuʔ', 'jun': 'ȝun', 'jum': 'ȝum',
  'jub': 'ȝub', 'juad': 'ȝuat', 'ju': 'ȝu',

  /* K */
  "kʉ'": 'kxʉʔ', 'kʉm': 'kxʉm', 'kʉl': 'kxʉl',
  'kʉd': 'kxʉt', 'kʉα': 'kxʉɑ', 'kʉ': 'kxʉ',
  "ku'": 'kxuʔ', 'kun': 'kxun', 'kum': 'kxum',
  'kul': 'kxul', 'kud': 'kxut', 'kub': 'kxub',
  'kuαn': 'kxuɑn', 'kuα': 'kxuɑ', "kua'": 'kxuɑʔ', 'ku': 'kxu',
  'kɔ': 'ko', "ko'": 'kuʔ', 'koŋ': 'kɔŋ', 'kom': 'kum',
  'kol': 'kul', 'kod': 'kud', 'kob': 'kub', 'kog': 'kɔk', 'ko': 'ku',
  "ki'": 'kxiʔ', 'kiαg': 'kxiɑk', 'kiα': 'kxiɑ', 'kib': 'kxib',
  'kin': 'kxin', 'ki': 'kxi', "ke'": 'kiʔ', 'kem': 'kim',
  'kel': 'kil', 'ked': 'kit', 'ke': 'ki',
  'kɛl': 'kɛl', 'kɛd': 'kɛt', "kə'": 'kʉʔ', 'kəm': 'kʉm',
  'kəl': 'kʉl', 'kəd': 'kʉt', 'kəb': 'kʉb', 'kə': 'kʉ',
  'kαn': 'kɑn', 'kαm': 'kɑm', 'kαg': 'kɑk', 'kαb': 'kɑb',
  'kα': 'kɑ', "ka'": 'kɑʔ', 'kaŋ': 'kaŋ', 'kam': 'kam',
  'kal': 'kal', 'kag': 'kak', 'kad': 'kat', 'kab': 'kab', 'ka': 'ka',

  /* L */
  "lʉ": 'lʉ', 'lo': 'lu', "lo'": 'luʔ', 'loŋ': 'lɔŋ',
  'log': 'lɔk', 'lon': 'lun', 'lob': 'lub', 'lɔ': 'lo',
  'lin': 'lin', 'lid': 'lit', 'li': 'li',
  'lɛl': 'lɛl', 'lɛd': 'lɛt', 'lɛ': 'lɛ',
  "le'": 'liʔ', 'lem': 'lim', 'lel': 'lil', 'led': 'lit', 'le': 'li',
  "lə'": 'lʉʔ', 'lən': 'lʉn', 'ləm': 'lʉm', 'ləl': 'lʉl',
  'ləd': 'lʉt', 'ləb': 'lʉb', 'lə': 'lʉ',
  'lαn': 'lɑn', 'lαm': 'lɑm', 'lαg': 'lɑg', 'lαb': 'lɑb',
  'lα': 'lɑ', "la'": 'lɑʔ', 'laŋ': 'laŋ', 'lam': 'lam',
  'lal': 'lal', 'lag': 'lak', 'lad': 'lat', 'lab': 'lab', 'la': 'la',

  /* M */
  "mə'": 'mʉʔ', 'mən': 'mʉn', 'məm': 'mʉm', 'mə': 'mʉ',
  "me'": 'miʔ', 'mem': 'mim', 'me': 'mi',
  'miαg': 'miɑk', 'miα': 'miɑ', 'min': 'min', 'mil': 'mil',
  'mid': 'mit', 'mib': 'mib', 'mi': 'mi',
  "mo'": 'muʔ', 'mom': 'mum', 'mo': 'mu', 'mɔ': 'mo',
  'mul': 'mul', 'mud': 'mut', 'mub': 'mub', 'mu': 'mu',
  'mαm': 'mɑm', 'mαg': 'mɑk', 'mα': 'mɑ',
  "ma'": 'mɑʔ', 'maŋ': 'maŋ', 'mal': 'mal',
  'mag': 'mak', 'mad': 'mat', 'ma': 'ma',

  /* N */
  "nʉ'": 'nʉʔ', 'nʉn': 'nʉn', 'nʉ': 'nʉ',
  "nu'": 'nuʔ', 'nul': 'nul', 'nud': 'nut', 'nu': 'nu',
  "no'": 'nuʔ', 'nol': 'nul', 'nog': 'nɔk', 'nod': 'nut', 'no': 'nu',
  'nɔ': 'no', 'nɛn': 'nɛn', 'nɛ': 'nɛ',
  "nə'": 'nʉʔ', 'nə': 'nʉ',
  'nαn': 'nɑn', 'nαb': 'nɑb', 'nα': 'nɑ',
  "na'": 'naʔ', 'naŋ': 'naŋ', 'nam': 'nam', 'na': 'na', 'ni': 'ni',

  /* S */
  'so': 'su', 'soŋ': 'shɔŋ', 'sob': 'sub', 'sog': 'shɔk', 'sɔ': 'so',
  "si'": 'shiʔ', 'siaŋ': 'shiaŋ', 'siαg': 'shiɑk', 'siα': 'shiɑ',
  'sia': 'shia', 'si': 'shi',
  'sɛn': 'sɛn', 'sɛ': 'sɛ', "se'": 'siʔ', 'sem': 'sim', 'seb': 'sib',
  'se': 'si', "sə'": 'shœʔ', 'sən': 'sʉn', 'səm': 'sʉm',
  'səl': 'sʉl', 'səd': 'sʉt', 'səb': 'sʉb', 'sə': 'sʉ',
  'sαn': 'sɑn', 'sαm': 'sɑm', 'sαg': 'sɑk', 'sαb': 'sɑb',
  'sα': 'sɑ', "sa'": 'saʔ', 'saŋ': 'saŋ', 'sam': 'sam',
  'sal': 'sal', 'sag': 'sak', 'sad': 'sat', 'sab': 'sab', 'sa': 'sa',
  'su': 'su', 'sub': 'sub', 'shu': 'ʃu', "shu'": 'ʃuʔ',
  'shud': 'ʃut', "sh'ʉ": 'ʃʉ', 'shʉ': 'ʃʉ', "shʉ'": 'ʃʉʔ',

  /* T */
  "tʉ'": 'thʉʔ', 'tʉn': 'thʉn', 'tʉ': 'thʉ',
  "tu'": 'thuʔ', 'tun': 'thun', 'tum': 'thum',
  'tul': 'thul', 'tud': 'thut', 'tub': 'thub', 'tu': 'thu',
  'tɔ': 'to', "to'": 'tuʔ', 'toŋ': 'tɔŋ', 'tom': 'tum',
  'ton': 'tun', 'tol': 'tul', 'tod': 'tut',
  'tob': 'tub', 'tog': 'tɔk', 'to': 'tu',
  'tiαg': 'thiɑk', 'tiα': 'thiɑ', 'ti': 'tsi',
  'tɛn': 'tɛn', 'tɛl': 'tɛl', 'tɛd': 'tɛt', 'tɛ': 'tɛ',
  'teb': 'tib', 'te': 'ti', "tə'": 'tʉʔ', 'tən': 'tʉn',
  'təm': 'tʉm', 'tə': 'tʉ',
  'tαn': 'tɑn', 'tαm': 'tɑm', 'tαg': 'tɑk', 'tαb': 'tɑb',
  'tα': 'tɑ', "ta'": 'taʔ', 'taŋ': 'taŋ', 'tam': 'tam',
  'tal': 'tal', 'tag': 'tak', 'tad': 'tat', 'tab': 'tab', 'ta': 'ta',

  /* V */
  "v'ʉ": 'vhʉ', 'vʉ': 'vhʉ', 'vog': 'vhɔk',
  'vib': 'vib', 'vɛn': 'vɛn', 'vɛ': 'vɛ',
  "və'": 'vhœʔ', 'və': 'vhœ',

  /* W */
  "w'ʉ": 'wʉ', 'wʉ': 'wʉ', 'wu': 'wu', 'wud': 'wut',
  'wɔ': 'wo', 'wɛn': 'wɛn', 'wɛl': 'wɛl', 'wɛd': 'wɛt', 'wɛ': 'wɛ',
  "wa'": 'waʔ', 'waŋ': 'waŋ', 'wal': 'wal', 'wag': 'wak', 'wad': 'wat',
  'wa': 'wa',

  /* Y */
  'yu': 'ju', 'yub': 'jub', 'yo': 'ju', "yo'": 'juʔ',
  'yoŋ': 'jɔŋ', 'yom': 'jum', 'yol': 'jul',
  'yog': 'jɔk', 'yod': 'jut', 'yob': 'jub',
  'yɛn': 'jɛn', 'yɛ': 'jɛ', "ye'": 'jiʔ', 'yed': 'jit', 'ye': 'ji',
  "yə'": 'jʉʔ', 'yən': 'jʉn', 'yə': 'jʉ',
  'yαm': 'jɑm', 'yαg': 'jɑg', 'yαb': 'jɑb', 'yα': 'jɑ',
  "ya'": 'jaʔ', 'yaŋ': 'jaŋ', 'yam': 'jam', 'yag': 'jak',
  'yad': 'jat', 'ya': 'ja',

  /* Z */
  "zə'": 'zhœʔ', 'zə': 'zhœ', "zi'": 'zhiʔ', 'zin': 'zhi',
  'zim': 'zhim', 'zil': 'zhil', 'zid': 'zhit', 'zib': 'zhib',
  'ziag': 'zhiag', 'zia': 'zhia', 'zi': 'zhi',
  "zwə'": 'zhuœʔ', 'zwə': 'zhuœ', "zwi'": 'zɥiʔ',
  'zwiαg': 'zɥiɑk', 'zwiα': 'zɥiɑ', 'zwiaŋ': 'zɥiaŋ',
  'zwia': 'zɥia', 'zwim': 'zɥim', 'zwil': 'zɥil',
  'zwid': 'zɥit', 'zwi': 'zɥi',

  /* ŋ */
  "ŋ'ʉ": 'ŋʉ', 'ŋʉ': 'ŋʉ', 'ŋu': 'ŋu', "ŋu'": 'ŋuʔ',
  'ŋαb': 'ŋɑb', 'ŋα': 'ŋɑ', "ŋa'": 'ŋaʔ', 'ŋam': 'ŋam',
  'ŋal': 'ŋal', 'ŋag': 'ŋak', 'ŋad': 'ŋad', 'ŋa': 'ŋa',
  'ŋə': 'ŋœ',

  /* Vowel-only syllables */
  "a'": 'ɑʔ', 'αb': 'ɑb', 'αm': 'ɑm', 'αn': 'ɑn',
  'α': 'ɑ', 'a': 'a',
  'ɛn': 'ɛn', "ɛ'": 'ɛʔ', 'ɛ': 'ɛ',
  "ɔ'": 'oʔ', 'ɔ': 'o',
  'o': 'u', 'u': 'u',
};

/* ── Sorted keys: longest match first ─────────────────────────── */
const SORTED_KEYS = Object.keys(SYLLABLE_IPA).sort((a, b) => b.length - a.length);

/* ── Normalize: strip tone marks for matching ─────────────────── */
function normalize(ch) {
  const map = {
    'à':'a','á':'a','â':'a','ǎ':'a','ā':'a',
    'è':'e','é':'e','ê':'e','ě':'e',
    'ì':'i','í':'i','î':'i','ǐ':'i',
    'ò':'o','ó':'o','ô':'o','ǒ':'o',
    'ù':'u','ú':'u','û':'u','ǔ':'u',
    'ὰ':'α','ά':'α','α̂':'α','α̌':'α',
    'ə̀':'ə','ə́':'ə','ə̂':'ə','ě':'ə',
    'ɛ̀':'ɛ','ɛ́':'ɛ','ɛ̂':'ɛ','ɛ̌':'ɛ',
    'ɔ̀':'ɔ','ɔ́':'ɔ','ɔ̂':'ɔ','ɔ̌':'ɔ',
    'ʉ̀':'ʉ','ʉ́':'ʉ','ʉ̂':'ʉ','ʉ̌':'ʉ',
  };
  return map[ch] ?? ch;
}

/* ── Normalize full string (strip tones, lowercase) ─────────────── */
function normalizeWord(word) {
  return [...word].map(normalize).join('').toLowerCase().trim();
}

/* ── Parse word → array of IPA syllables ─────────────────────── */
export function wordToIPA(word) {
  const norm = normalizeWord(word);
  let i = 0;
  const result = [];

  while (i < norm.length) {
    let matched = false;
    for (const key of SORTED_KEYS) {
      if (norm.startsWith(key, i)) {
        result.push(SYLLABLE_IPA[key]);
        i += key.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      result.push(norm[i]);
      i++;
    }
  }
  return result.join('');
}

/* ── IPA → French TTS approximation ─────────────────────────────
   Maps IPA to approximate French phonetics for expo-speech (fr-FR).
   This lets the TTS engine approximate Medumba pronunciation.
──────────────────────────────────────────────────────────────── */
const IPA_TO_FRENCH = [
  /* Affricates */
  ['tʃh', 'tch'],  ['tʃ', 'tch'],
  ['ndȝ', 'ndj'],  ['nȝ', 'nj'],   ['ȝ', 'j'],
  ['ntsi', 'ntsi'], ['nts', 'nts'],  ['ts', 'ts'],

  /* Nasals + stops */
  ['ŋkx', 'nkh'],  ['ŋk', 'nk'],
  ['ŋgh', 'ngh'],  ['ŋg', 'ng'],
  ['ŋ', 'ng'],
  ['mbh', 'mb'],   ['mb', 'mb'],
  ['ndh', 'nd'],   ['nd', 'nd'],
  ['nth', 'nt'],   ['nt', 'nt'],
  ['ntʃh', 'ntch'], ['ntʃ', 'ntch'],
  ['nzh', 'nz'],   ['nz', 'nz'],
  ['nsh', 'nch'],  ['nʃ', 'nch'],
  ['ɲ', 'gn'],
  ['mfh', 'mf'],   ['mf', 'mf'],
  ['mvh', 'mv'],   ['mv', 'mv'],

  /* Fricatives */
  ['kx', 'k'],     ['bh', 'b'],
  ['dh', 'd'],     ['fh', 'f'],
  ['gh', 'g'],     ['kh', 'k'],
  ['th', 't'],     ['vh', 'v'],
  ['zh', 'j'],     ['zh', 'j'],
  ['ʃ', 'ch'],

  /* Glide + glottal */
  ['ɥ', 'u'],      ['ʔ', ''],

  /* Vowels */
  ['ɑ', 'a'],      ['œ', 'eu'],
  ['ɛ', 'è'],      ['ʉ', 'eu'],
  ['ɔ', 'o'],
];

export function ipaToFrenchTTS(ipa) {
  let s = ipa;
  for (const [from, to] of IPA_TO_FRENCH) {
    s = s.split(from).join(to);
  }
  return s;
}

/* ── Full pipeline: Medumba word → French TTS string ─────────── */
export function medumbaToTTS(word) {
  const ipa = wordToIPA(word);
  return ipaToFrenchTTS(ipa);
}

/* ── Speak a Medumba word using expo-speech ─────────────────────
   Uses French locale (closest available) with phonetic approximation.
──────────────────────────────────────────────────────────────── */
export function speakMedumba(word, options = {}) {
  if (!word || typeof word !== 'string') return;
  const ttsText = medumbaToTTS(word);
  Speech.speak(ttsText, {
    language: 'fr-FR',
    pitch: 1.0,
    rate: 0.75,
    ...options,
  });
}

export function stopSpeaking() {
  Speech.stop();
}

/* ── Utility: phonetic display string (IPA) ─────────────────────
   Use in UI to show pronunciation e.g. [tʃàʔtʉ̀]
──────────────────────────────────────────────────────────────── */
export function getIPA(word) {
  return `[${wordToIPA(word)}]`;
}
