let handler = async (m, { conn, isAdmin, isROwner }) => {
  if (!(isAdmin || isROwner)) {
    return dfail('admin', m, conn)
  }

  global.db.data.chats[m.chat].isBanned = false

  await conn.sendMessage(m.chat, {
    text: '✅ 𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐀𝐜𝐭𝐢𝐯𝐨.',
    contextInfo: {
      externalAdReply: {
        title: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
        body: '𝐀𝐧𝐠𝐞𝐥 𝐁𝐨𝐭 𝐃𝐞𝐥𝐚𝐲',
        mediaType: 1,
        thumbnailUrl: 'https://files.catbox.moe/ntyp5r.jpg',
        renderLargerThumbnail: false,
        sourceUrl: ''
      }
    }
  }, { quoted: m })

  await m.react('✅')
}

handler.help = ['desbanearbot']
handler.tags = ['group']
handler.command = ['desbanearbot', 'unbanchat']
handler.group = true

export default handler