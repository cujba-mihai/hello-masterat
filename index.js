const sanitizeHtml = require('sanitize-html');
const { scriptsToAdd, mainStyles } = require('./tags');

const fs = require('fs');
const htmlBefore = fs.readFileSync('./index.html', { encoding: 'utf8' });

const htmlAfter = sanitizeHtml(htmlBefore, {
    allowedTags: ['style', 'i', 'body', 'head', 'html', 'DOCTYPE', 'input', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'title', 'ul', 'ol', 'li', /**'table', 'th', 'tr', 'td' */],
    allowedClasses: {
        '*': [/que.*completed/gmi, 'answer', 'sr-only', 'sr-only-focusable', 'submitbtns', 'qn_buttons', 'allquestionsononepage', 'navbar', 'navbar-expand', 'generaltable', 'quizreviewsummary', 'global-search', 'search-container', 'flex-fill', 'ml-1', 'qtext', 'state', 'grade', 'deferredfeedback', ...'icon fa fa-check text-success fa-fw'.split(' '), 'text-danger']
    },
    allowedAttributes: {
        '*': ['id', 'src', 'crossorigin', 'integrity', 'alt', 'type', 'disabled', 'checked', 'value']
    }
});

const withScripts = (html) => html.replace('</body>', scriptsToAdd.join('').concat('</body>'));
const withStyle = html => html.replace('</head>', mainStyles.join('').concat('</head>'));

const sanitizeHTML = html => withScripts(withStyle(html));

const cleanHtml = require('clean-html').clean(htmlAfter, undefined, (html) => {
    return fs.writeFileSync('./index.html', new Buffer.from(sanitizeHTML(html)));
});

