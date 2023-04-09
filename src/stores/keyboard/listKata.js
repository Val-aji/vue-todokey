
const kata = [
    'bangun',       'diam',            'duduk',       'makan',
    'minum',        'jatuh',           'terjun',      'pergi',
    'mandi',        'tidur',           'lari',        'catat',
    'pinta',        'kerja',           'pinjam',      'pulang',
    'maju',         'mundur',          'tangkap',     'turun',
    'manajemen',    'manajer',         'mandek',      'masyhur',
    'matang',       'memperhatikan',   'memerintah',  'memesona',
    'memopulerkan', 'mengapa',         'mengubah',    'menteri',
    'menyontek',    'menyukseskan',    'merek',       'meterai',
    'metode',       'miliar',          'museum',      'nahas',
    'nakhoda',      'napas',           'nasihat',     'negeri',
    'objek',        'objektif',        'omzet',       'orang tua',
    'paham',        'pembaruan',       'penasihat',   'perajin',
    'permukiman',   'persentase',      'perusak',     'praktik',
    'prancis',      'prangko',         'ramai',       'rapi',
    'saksama',      'saraf',           'sekadar',     'sekretaris',
    'seprai',       'silakan',         'karena',      'sebab',
    'sehingga',     'demikian',        'agar',        'jika',
    'akibatnya',    'efektif',         'efektivitas', 'ekosistem',
    'ekstra',       'ekstrakurikuler', 'ekspor',      'elite',
    'favorit',      'foto',            'februari',    'gua',
    'gubuk',        'hektare',         'hierarki',    'higienis',
    'hipotesis',    'ijazah',          'ikhlas',      'imbau',
    'indra',        'insaf',           'isap',        'istri',
    'izin',         'intelijen',       'interogasi',  'jenderal',
    'karier',          'kategori',    'komplet',       'makhluk',
    'konkret',      'kreativitas',     'kuitansi',    'kiai',        'kuesioner',    'legalisasi',      'lemari',      'lembap', 
    'lubang',    
  ]

export const bankKata = kata.map(item => {
  if(item.length > 9) {
    item = item.substring(0, 9)
  }
  return item
})