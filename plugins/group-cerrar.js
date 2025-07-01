const handler = (m, { conn }) => {
  if (!m.isGroup) return
  conn.groupMetadata(m.chat).then(meta => {
    const admins = meta.participants.filter(p => p.admin).map(p => p.id)
    const isAdmin = admins.includes(m.sender)

    if (!isAdmin) return

    conn.groupSettingUpdate(m.chat, 'announcement')
      .then(() => {
        conn.sendMessage(m.chat, {
          text: '🔒 *Grupo cerrado solo para admins.*',
          contextInfo: {
            externalAdReply: {
              title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              thumbnailUrl: "https://files.catbox.moe/ntyp5r.jpg",
              renderLargerThumbnail: false,
              sourceUrl: ''
            }
          }
        }, { quoted: m })
      })
      .catch(() => {
        conn.sendMessage(m.chat, {
          text: '❌ No tengo permisos para cerrar el grupo.',
          contextInfo: {
            externalAdReply: {
              title: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              body: "𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲",
              thumbnailUrl: "https://files.catbox.moe/ntyp5r.jpg",
              renderLargerThumbnail: false,
              sourceUrl: ''
            }
          }
        }, { quoted: m })
      })
  })
}

handler.customPrefix = /^cerrar$/i
handler.command = new RegExp
export default handler