import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  // let data1 = "We are subject to income taxes in several jurisdictions including A, B and C."
  // let data2 = "We are subject to income tax in many jurisdictions"
  
  let data1 = "The growing demand for efficient and scalable software solutions has led companies to adopt modern development practices. Agile methodologies, for instance, enable teams to rapidly iterate and respond to customer needs. Continuous integration and delivery pipelines further enhance the development process by automating testing and deployment. As a result, developers can focus more on writing high-quality code, while businesses enjoy faster release cycles and better product quality."
  let data2 = "The increasing need for efficient and scalable software solutions has pushed companies to embrace modern development practices. Agile frameworks, in particular, allow teams to quickly adapt and respond to customer demands. Continuous integration and deployment pipelines streamline the development process by automating both testing and delivery. This allows developers to concentrate more on creating high-quality code, while companies benefit from quicker release cycles and improved product quality."

  function getDiff(string1, string2) {
    let res = [];

    let arr1 = string1.split(' ');
    let arr2 = string2.split(' ');
    
    let graph = new Array(arr2.length + 1);
    for (let i = 0; i < graph.length; i++) {
        graph[i] = new Array(arr1.length + 1);
    }

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

    let i = 0;
    let j = 0;
    while (i < graph.length - 1 && j < graph[0].length - 1) {
        if (arr1[j] === arr2[i] && graph[i][j] === graph[i + 1][j + 1]) {
            i++;
            j++;
            continue;
        }
        // Delete
        else if (graph[i][j + 1] <= graph[i + 1][j]) {
            // res.push(`-${arr1[j]}`); // or just j
            res.push(`-${j}`);
            j++;
        } else {
            // res.push(`+${arr2[i]}`); // or just i
            res.push(`+${i}`);
            i++;

        }

    }
    if (i < graph.length - 1) {
        // res.push(`+${arr2.slice(i).join(' ')}`);
        res.push(`+${i}`);

    }
    if (j < graph[0].length - 1) {
        // res.push(`-${arr1.slice(j).join(' ')}`)
        res.push(`-${j}`)
    }

    return res;
  }

  let diff = getDiff(data1, data2);
  console.log(diff)

  // + is something already in new string
  // - is something we got rid of, but how to find it's position
  let arr1 = data1.split(' ');
  let arr2 = data2.split(' ');

  let current = 0;

  function run() {
    let re = [];
    for (let i = 0; i < arr2.length; i++) {
      // if (diff[current] === `-${i}`) {
      //   re.push(<span className={styles.red}>{arr1[i]}</span>);
      //   current++;
      // } 
      // if (diff[current] === `+${i}`) {
      //   re.push(<span className={styles.green}>{arr2[i] + " "}</span>);
      //   current++;
      //   continue;
      // }

      // return span in regular text
      if (diff.includes(`+${i}`)) {
        re.push(<span className={styles.green}>{arr2[i] + " "}</span>);

      } else {
        re.push(<span>{arr2[i] + " "}</span>);

      }
    }
    for (let i = arr1.length; i >= 0; i--) {
      if (diff.includes(`+${i}`)) {
        re.splice(i, 0, <span className={styles.red}>{arr1[i] + " "}</span>);
      }
    }
    return re;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.old}>
          <p>
            {data1}
          </p> 
        </div>
        <div className={styles.new}>
          <p>
            {run()
            /* {
              (() => {
                let re = [];
                for (let i = 0; i < arr1.length; i++) {
                  if (diff[current] === `-${i}`) {
                    re.push(<span className="red">{data1.split(' ')[i]}</span>);
                    current++;
                  } 
                  if (diff[current] === `+${i}`) {
                    re.push(<span className="green">{arr2[i]}</span>);
                    current++;
                    continue;
                  }

                  // return span in regular text
                  re.push(<span>{arr2[i]}</span>);
                }
                console.log(re)
                return re;
              })
            } */}
          </p>
        </div>
      </main>
    </div>
  );
}
