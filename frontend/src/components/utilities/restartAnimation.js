export default function restartAnimation() {
    let nodes1 = document.querySelectorAll(".fade-in-one");
    let nodes2 = document.querySelectorAll(".fade-in-two");
    let nodes3 = document.querySelectorAll(".fade-in-three");

    let myArray = Array.from(nodes1).concat(Array.from(nodes2), Array.from(nodes3))
    for (let i = 0; i < myArray.length; i++) {
      let node = myArray[i]
      node.style.animationName = "None";
      requestAnimationFrame(() => {node.style.animationName = ""} );
    }
}