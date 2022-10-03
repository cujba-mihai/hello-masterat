exports.scriptsRemoveRegex = `<!-- const removeScriptsREGEX = /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>/; -->
`
exports.scriptsToAdd = [
    `                <script src="https://code.jquery.com/jquery-3.6.1.min.js"
    integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>`,
    `                <script defer>
    const questionContainers = $('.deferredfeedback');
    const questions = $('.qtext');
    const grades = $('.state + .grade');
    const pageWrappers = document.querySelectorAll('#page-wrapper');

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
        const gradeText = grades[i].innerText.replace(/Marked out/g, '0.00');
        const questionContainer = questionContainers[i];
        const grade = gradeText
            .replace(/,/g, '.')
            .split(' ')
            .filter(grade => parseFloat(grade) >= 0);

        const rank = grade.reduce((a, b) => parseFloat(a) / parseFloat(b));

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


</script>`,
    // `                <script defer>
    // $('.global-search').on('input', ev => {
    //     const questionContainers = $('.que.deferredfeedback');
    //     const questions = $('.qtext');
    //     const reg = new RegExp(ev.currentTarget.value, 'gmi');

    //     questionContainers.filter((index, element) => {
    //         const val = reg.test(questions[index].innerText);
    //         if (val) {
    //             questionContainers[index].style.display = 'block';
    //         } else {
    //             questionContainers[index].style.display = 'none';
    //         }
    //         return val;
    //     })

    // })

    // </script>`
]

exports.mainStyles = [
    `    <style>
    i.text-success.fa-check::before {
        content: "✓";
        color: green;
    }

    .fa-remove::before,
    .fa-close::before,
    .fa-times::before {
        content: "x";
        color: red;
    }

    .deferredfeedback {
        border: 1px solid black;
        margin: 15px 0;
    }

    body:nth-child(3) {
        margin-top: 50px;
    }

    .answer {
        margin: 10px 0px 20px 0px;
    }

    .answer>* {
        display: flex;
        margin-top: 5px;
    }

    .que.complete {
        padding: 0 0 0 10px;
    }

    #page-wrapper:first-child,
    .sr-only.sr-only-focusable {
        color: red;
        display: none;
    }

    tbody {
        flex-wrap: wrap;
    }

    #page-header,
    .generaltable.quizreviewsummary,
    .navbar.navbar-expand,
    #page-wrapper:nth-child(1),
    .qn_buttons.allquestionsononepage,
    #block-region-side-pre,
    .submitbtns {
        display: none;
    }


    .global-search {
        width: 100%;
        border: 1px solid black;
        outline: none;
        padding: 3px 10px;
        margin-left: 20px;
    }

    .flex-fill.ml-1 {
        margin-left: 1rem;
    }

    .search-container {
        position: fixed;
        background: red;
        min-width: 80%;
        max-width: 100vw;
        min-height: 30px;
        max-height: 100px;
        display: grid;
        place-items: center;
        border-radius: 45px;
        background: #e0e0e0;
        box-shadow: 35px 35px 70px #b1b1b1,
            -35px -35px 70px #ffffff;
    }
</style>`
]