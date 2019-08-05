/* eslint linebreak-style: ["error", "windows"] */
class HTML {
  static stripTags(html: string) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}


module.exports = HTML;