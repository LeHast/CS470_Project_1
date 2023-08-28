const top = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        th, td {
            border: solid 1px;
            width: 70px;
            text-align: center;
        }

        td.direction {
            width: 400px;
            text-align: left;
            padding-left: 5px;
        }

        tr {
            border: solid 1px
            vertical-align: center;
            height: 50px;
        }

        table {
            border-collapse: collapse;
            margin: auto;
        }
    </style>
    <title>Intro To JavaScript</title>
</head>
<body>
`;

module.exports = top;
