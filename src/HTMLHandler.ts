/* eslint linebreak-style: ["error", "windows"] */
class HTMLHandler {
  static stripTags(html: string) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  static stripTagsLeaveBR( html: string ) {
		html = html.replace(/<(?!br\s*\/?)[^>]+>/g, '');
		return html;
  }
}


module.exports = HTMLHandler;

export default HTMLHandler;
