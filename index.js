const sanitizeHtml = require('sanitize-html');
const { mainStyles } = require('./tags');

const fs = require('fs');
const htmlBefore = fs.readFileSync('./index.html', { encoding: 'utf8' });

const htmlAfter = sanitizeHtml(htmlBefore, {
    allowedTags: ['style', 'i', 'body', 'head', 'html', 'DOCTYPE', 'input', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'title', 'ul', 'ol', 'li', 'table', 'th', 'tr', 'td', 'tbody', 'option', 'label', 'select'],
    allowedClasses: {
        '*': [/que.*completed/gmi, 'answer', 'sr-only', 'sr-only-focusable', 'submitbtns', 'qn_buttons', 'allquestionsononepage', 'navbar', 'navbar-expand', 'generaltable', 'quizreviewsummary', 'global-search', 'search-container', 'flex-fill', 'ml-1', 'qtext', 'state', 'grade', 'deferredfeedback', ...'icon fa fa-check text-success fa-fw'.split(' '), 'text-danger']
    },
    allowedAttributes: {
        '*': ['id', 'src', 'crossorigin', 'integrity', 'alt', 'type', 'disabled', 'checked', 'value', 'selected']
    },
    allowVulnerableTags: true

});

const withStyle = html => html.replace('</head>', mainStyles.join('').concat('</head>'));

const sanitizeHTML = html => withStyle(html);



const cleanHtml = require('clean-html').clean(htmlAfter, undefined, (html) => {
    const { parse } = require('node-html-parser');
    const root = parse(html);

    const questionContainers = root.querySelectorAll('.deferredfeedback');
    const questions = root.querySelectorAll('.qtext');
    const grades = root.querySelectorAll('.state + .grade');
    const pageWrappers = root.querySelectorAll('#page-wrapper');

    for (let i = 0; i < pageWrappers.length; i++) {
        if (i === 0) {
            pageWrappers[i].style = 'padding-top: 50px;'
        } else {
            pageWrappers[i].style = 'padding-top: 0px;'
        }
    }


    const uniqueQuestions = {};

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i].innerText;
        const gradeText = grades[i].innerText?.replace(/Marked out/g, '0.00');
        const questionContainer = questionContainers[i];
        const grade = gradeText
            ?.replace(/,/g, '.')
            .split(' ')
            .filter(grade => parseFloat(grade) >= 0);

        const rank = grade?.reduce((a, b) => parseFloat(a) / parseFloat(b));

        if (uniqueQuestions?.[question] <= rank) {
            questionContainer && questionContainer.setAttribute('display', 'none');
            uniqueQuestions[question] = parseFloat(rank);
        } else {
            uniqueQuestions[question] = parseFloat(rank);
        }

        if (questionContainer) {
            switch (rank) {
                case 1:
                    questionContainer.setAttribute('style', 'background-color: #a1d5a1;');
                    break;
                case 0:
                    questionContainer.setAttribute('style', 'background-color: #fdccd1;');
                    break;
                default:
                    questionContainer.setAttribute('style', 'background-color: #f4e7a1;');
            }
        }
    }
    return fs.writeFileSync('./index.html', new Buffer.from(sanitizeHTML(root.toString())));
});