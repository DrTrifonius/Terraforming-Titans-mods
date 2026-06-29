// ==UserScript==
// @name         Terraforming Titans two-column resources
// @namespace    http://tampermonkey.net/
// @version      2026-06-28
// @description  two column resource view for Terraforming Titans (itch version)
// @author       Trifonius
// @match        https://html-classic.itch.zone/html/*
// @grant        none
// ==/UserScript==


(function () {
    if (!document.title.includes("Terraforming Titans")){
        console.log("different game; exiting Terraforming script...")
        return 0
    }

    const btnHolder = document.createElement("div")

    btnHolder.innerHTML = `
    <button id="twoColBtn">Two column layout</button>
    <button id="oneColBtn" hidden>One column layout</button>
`
    const resourcesContainer = document.querySelector("#resources-container")

    resourcesContainer.insertAdjacentElement("afterend", btnHolder)

    console.log("script loaded")

    const styleUpdate = document.createElement("style");
    styleUpdate.innerHTML = `
 .resource-wrapper {
  min-width: 500px;
}
  #resources-container {
    display: flex;
  }
`;
    styleUpdate.setAttribute("id", "TwoColStyle")


    function twoColumnResources() {


        const resourceContainer = document.querySelector("#resources-container")

        const colonyResources = document.querySelector("#colony-resources-header").parentElement
        const specialResources = document.querySelector("#special-resources-header").parentElement
        const spaceResources = document.querySelector("#spaceStorage-resources-header").parentElement
        const surfaceResources = document.querySelector("#surface-resources-header").parentElement
        const undergroundResources = document.querySelector("#underground-resources-header").parentElement
        const atmosphericResources = document.querySelector("#atmospheric-resources-header").parentElement
        document.head.appendChild(styleUpdate);

        const firstColumn = document.createElement("span")
        firstColumn.setAttribute("style", "padding: 5px;flex: 50%;  outline-right:solid thin; ")
        firstColumn.setAttribute("id", "ResColOne")
        const secondColumn = document.createElement("span")
        secondColumn.setAttribute("style", "padding:5px; flex: 50%")
        secondColumn.setAttribute("id", "ResColTwo")

        colonyResources.insertAdjacentElement("beforebegin", firstColumn)
        colonyResources.insertAdjacentElement("beforebegin", secondColumn)

        firstColumn.appendChild(colonyResources)
        firstColumn.appendChild(specialResources)
        firstColumn.appendChild(spaceResources)
        secondColumn.appendChild(surfaceResources)
        secondColumn.appendChild(undergroundResources)
        secondColumn.appendChild(atmosphericResources)

        document.querySelector("#oneColBtn").removeAttribute("hidden")
        document.querySelector("#twoColBtn").setAttribute("hidden", "hidden")
    }

    function oneColumnResources() {

        const resourceContainer = document.querySelector("#resources-container")

        const colonyResources = document.querySelector("#colony-resources-header").parentElement
        const specialResources = document.querySelector("#special-resources-header").parentElement
        const spaceResources = document.querySelector("#spaceStorage-resources-header").parentElement
        const surfaceResources = document.querySelector("#surface-resources-header").parentElement
        const undergroundResources = document.querySelector("#underground-resources-header").parentElement
        const atmosphericResources = document.querySelector("#atmospheric-resources-header").parentElement
        document.querySelector("#TwoColStyle").remove()
        resourceContainer.insertAdjacentElement("afterbegin", specialResources)
        resourceContainer.insertAdjacentElement("afterbegin", atmosphericResources)
        resourceContainer.insertAdjacentElement("afterbegin", undergroundResources)
        resourceContainer.insertAdjacentElement("afterbegin", surfaceResources)
        resourceContainer.insertAdjacentElement("afterbegin", spaceResources)
        resourceContainer.insertAdjacentElement("afterbegin", colonyResources)
        document.querySelector("#ResColOne").remove();
        document.querySelector("#ResColTwo").remove();


        document.querySelector("#oneColBtn").setAttribute("hidden", "hidden")
        document.querySelector("#twoColBtn").removeAttribute("hidden")
    }

    document.querySelector("#oneColBtn").onclick = oneColumnResources
    document.querySelector("#twoColBtn").onclick = twoColumnResources
})();