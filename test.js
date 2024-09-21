
let string1 = "We are subject to income taxes in several jurisdictions including A, B and C."
// \
//  outside the U.S. Our operations in certain jurisdictions remain\
//  subject to examination for tax years 1996 to 2023, some of which\
//  are currently under audit by local tax authorities. The resolution\
//  of each of these audits is not expected to be material to our\
//  consolidated financial statements."

 let string2 = "We are subject to income tax in many jurisdictions"
 
//  \
//   outside the U.S. Our operations in certain jurisdictions remain\
//   subject to examination for tax years 1996 to 2022, some of which\
//   are currently under audit by local tax authorities. The resolution\
//   of each of these audits is not expected to be material to our\
//   consolidated financial statements."
  let string22 = `
  •Microsoft Cloud revenue increased 22% to $111.6 billion.
  •Office Commercial products and cloud services revenue increased 10% driven by Office 365 Commercial growth of 13%.
  •Office Consumer products and cloud services revenue increased 2% and Microsoft 365 Consumer subscribers increased to 67.0 million.
  •LinkedIn revenue increased 10%.
  •Dynamics products and cloud services revenue increased 16% driven by Dynamics 365 growth of 24%.
  •Server products and cloud services revenue increased 19% driven by Azure and other cloud services growth of 29%.
  •Windows original equipment manufacturer licensing (“Windows OEM”) revenue decreased 25%.
  •Devices revenue decreased 24%.
  •Windows Commercial products and cloud services revenue increased 5%.
  •Xbox content and services revenue decreased 3%.
  •Search and news advertising revenue excluding traffic acquisition costs increased 11%.`
  let string333 = "Revenue increased $33.2 billion or 16% driven by growth across each of our segments. Intelligent Cloud revenue increased driven by Azure. Productivity and Business Processes revenue increased driven by Office 365 Commercial. More Personal Computing revenue increased driven by Gaming."
    let string222 = "More Personal Computing revenue increased driven by Gaming. Revenue increased $33.2 billion or 16% driven by growth across each of our segments. Intelligent Cloud revenue increased driven by Azure. Productivity and Business Processes revenue increased driven by Office 365 Commercial."

    let string11 = `
  •Microsoft Cloud revenue increased 23% to $137.4 billion.
  •Office Commercial products and cloud services revenue increased 14% driven by Office 365 Commercial growth of 16%.
  •Office Consumer products and cloud services revenue increased 4% and Microsoft 365 Consumer subscribers grew to 82.5 million.
  •LinkedIn revenue increased 9%.
  •Dynamics products and cloud services revenue increased 19% driven by Dynamics 365 growth of 24%.
  •Server products and cloud services revenue increased 22% driven by Azure and other cloud services growth of 30%.
  •Windows revenue increased 8% with Windows original equipment manufacturer licensing (“Windows OEM”) revenue growth of 7% and Windows Commercial products and cloud services revenue growth of 11%.
  •Devices revenue decreased 15%.
  •Xbox content and services revenue increased 50% driven by 44 points of net impact from the Activision Blizzard Inc. (“Activision Blizzard”) acquisition. The net impact reflects the change of Activision Blizzard content from
  •Search and news advertising revenue excluding traffic acquisition costs increased 12%.`
let arr1 = string222.split(' ');
 let arr2 = string333.split(' ');

 let res = [];
 
 let graph = new Array(arr2.length + 1);
 for (let i = 0; i < graph.length; i++) {
    graph[i] = new Array(arr1.length + 1);
 }
// console.log(graph)

function helper(graph, newText, oldText, index1 = 0, index2 = 0) {
    if (graph[index1] && graph[index1][index2] !== undefined) return graph[index1][index2];

    if (index1 >= oldText.length) {
        graph[index1][index2] = newText.length - index2;
        return graph[index1][index2];
    }
    if (index2 >= newText.length) {
        graph[index1][index2] = oldText.length - index1;
        return graph[index1][index2];
    }

    if (oldText[index1] === newText[index2]) {
        graph[index1][index2] = helper(graph, newText, oldText, index1 + 1, index2 + 1);
        return graph[index1][index2];
    } else {
        graph[index1][index2] = 1 + Math.min(
            helper(graph, newText, oldText, index1 + 1, index2),
            helper(graph, newText, oldText, index1, index2 + 1)
        );
        return graph[index1][index2];
    }
}

helper(graph, arr1, arr2, 0, 0)

for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[0].length; j++) {
        if (!graph[i][j]) graph[i][j] = ' ';
    }
}
// console.log(graph)

let i = 0;
let j = 0;
while (i < graph.length - 1 && j < graph[0].length - 1) {
    console.log(i, j)
    if (arr1[j] === arr2[i] && graph[i][j] === graph[i + 1][j + 1]) {
        i++;
        j++;
        continue;
    }
    // Delete
    if (graph[i][j + 1] <= graph[i + 1][j]) {
        res.push(`-${arr1[j]}`); // or just j
        j++;
    } else {
        res.push(`+${arr2[i]}`); // or just i
        i++;
    }
    // console.log(i, j, res)

}
if (i < graph.length - 1) {
    res.push(`+${arr2.slice(i).join(' ')}`);
}
if (j < graph[0].length - 1) {
    res.push(`-${arr1.slice(j).join(' ')}`)
}
console.log(res)
// console.log(graph[7][8], graph)

// "We              are subject to income tax in several jurisdictions including A, B   and  C."
// "We"          7 |   |      |   |      |   |   |      |            |         |   |   |   |   |  
// "Are"           | 7 |      |   |      |   |   |      |            |         |   |   |   |   |  
// "Subject"       |   | 7    |   |      |   |   |      |            |         |   |   |   |   |  
// "To"            |   |      | 7 |      |   |   |      |            |         |   |   |   |   |  
// "Income"        |   |      |   | 7    |   |   |      |            |         |   |   |   |   |  
// "Tax"           |   |      |   |      | 7 |   |      |            |         |   |   |   |   |  
// "In"            |   |      |   |      |   | 7 |      |            |         |   |   |   |   |  
// "Many"          |   |      |   |      |   |   | 7    | 6          | 7       | 6 | 5 | 4 | 3 | 2
// "Jurisdictions" |   |      |   |      |   |   | 6    | 5          | 6       | 5 | 4 | 3 | 2 | 1
//                 |   |      |   |      |   |   | 7    |            | 5       | 4 | 3 | 2 | 1 |  
