import fetch from "node-fetch";
import yts from "yt-search";

const handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, "🎧 Ingresa el nombre o enlace del video.", m);

  const search = await yts(text);
  const vid = search.all[0];
  if (!vid) return conn.reply(m.chat, "❌ No se encontró el video.", m);

  const { title, url, thumbnail } = vid;
  const thumb = (await conn.getFile(thumbnail)).data;

  // Manda info + thumbnail
  conn.sendMessage(m.chat, {
    image: thumb,
    caption: `🎧 *${title}*`,
    contextInfo: {
      externalAdReply: {
        title: "Sasuke Bot MD",
        body: "Descarga rápida",
        mediaUrl: url,
        sourceUrl: url,
        thumbnail: thumb,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  try {
    const isAudio = ["play", "yta", "ytmp3"].includes(command);
    const endpoint = isAudio
      ? `https://api.siputzx.my.id/api/d/ytmp3?url=${url}`
      : `https://api.siputzx.my.id/api/d/ytmp4?url=${url}`;
    const res = await fetch(endpoint);
    const json = await res.json();
    const mediaUrl = json?.result?.url || json?.data?.download;

    if (!mediaUrl) throw new Error("⚠️ No se obtuvo enlace de descarga.");

    await conn.sendMessage(m.chat, {
      [isAudio ? "audio" : "video"]: { url: mediaUrl },
      fileName: `${title}.${isAudio ? "mp3" : "mp4"}`,
      mimetype: isAudio ? "audio/mpeg" : "video/mp4",
      caption: isAudio ? "" : `🎥 ${title}`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, "❌ Error descargando el archivo. Intenta de nuevo.", m);
  }
};

handler.command = ["play", "play2", "yta", "ytmp3", "ytv", "ytmp4"];
handler.tags = ["downloader"];
handler.help = ["play <nombre/url>", "ytmp3 <nombre/url>", "ytmp4 <nombre/url>"];

export default handler;