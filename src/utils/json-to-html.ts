export const JsonToHtml = (obj: any) => {
  let html = '';
  for (const key in obj) {
    if (typeof obj[key] === 'function' || key === 'Password') continue;
    if (Array.isArray(obj[key])) {
      html += `<h2>${key}</h2>`;
      html += '<ul>';
      for (const value of obj[key]) {
        if (typeof value === 'object') {
          html += `<li>${JsonToHtml(value)}</li>`;
        } else {
          html += `<li>${value}</li>`;
        }
      }
      html += '</ul>';
    } else if (typeof obj[key] === 'object') {
      html += `<h2>${key}</h2>`;
      html += JsonToHtml(obj[key]);
    } else if (!!obj[key]) {
      html += `<p>${key}: ${obj[key]}</p>`;
    }
  }
  return html;
};
