/* eslint-disable */
import {getDeepObject} from 'utils';
import update from 'react/lib/update';

/**
 * Get node top parent by node index
 * @param nodeTree
 * @param nodeIndexNeedGet
 * @returns {*}
 */
export function getNodeTopParent(nodeTree, nodeIndexNeedGet) {
    let nodeLength = 0;
    if (nodeIndexNeedGet === 0) return nodeTree[nodeIndexNeedGet];
    for (let index = 0; index < nodeTree.length; index++) {
        nodeLength++;
        if (nodeTree[index].children && nodeTree[index].expanded) {
            nodeLength += getNodeTopParent(nodeTree[index].children);
        }
        if (nodeLength === nodeIndexNeedGet) {
            return nodeTree[index + 1];
        }
    }
    return nodeLength;
}


/**
 * Convert from treeData with path to array level 1
 * @param nodeTree
 * @param path
 * @returns {*[]}
 */
export function convertNodeTreeToArray(nodeTree, path) {
    let nodePath = getNodeTopParent(nodeTree, path[0]);//getDeepObject(nodeTree, {}, path[0]);

    let nodePathTreeToArray = [
        nodePath
    ];

    let nodeIndex = 1;

    /**
     * Convert node tree to array 1 level expect node parent = 0
     */
    while (nodeIndex < path.length) {
        let distanceNode = path[nodeIndex] - path[nodeIndex - 1] - 1;
        if (distanceNode === 0) {
            nodePath = getDeepObject(nodePath.children, {}, distanceNode);
            nodePathTreeToArray.push(nodePath);
        }
        else {
            let nodePathIndex = path[nodeIndex] - distanceNode - path[nodeIndex - 1];
            nodePath = getDeepObject(nodePath.children, {}, nodePathIndex);
            nodePathTreeToArray.push(nodePath);
        }
        nodeIndex++;
    }

    return nodePathTreeToArray;
}

export function updateNodeTreePathLast(nodePathTreeToArray, data = {}) {
    let nodeIndex = nodePathTreeToArray.length - 2;
    while (nodeIndex >= 0) {
        let nodeAfterCurrent = nodePathTreeToArray[nodeIndex + 1];
        let nodeCurrent = nodePathTreeToArray[nodeIndex]
        let nodeChildrenIndex = nodeCurrent.children.findIndex(nodeChild => nodeChild.id === nodeAfterCurrent.id);
        if (nodeChildrenIndex < 0) continue;
        nodePathTreeToArray = update(nodePathTreeToArray, {
            [nodeIndex]: {
                children: {
                    [nodeChildrenIndex]: {
                        $apply: (nodeData) => {
                            if (nodeIndex === nodePathTreeToArray.length - 2) {
                                return {
                                    ...nodeData,
                                    ...data
                                }
                            }
                            else return nodeAfterCurrent;
                        }
                    }
                }
            }
        });
        nodeIndex--;
    }
    if (nodePathTreeToArray.length - 2 >= 0) return nodePathTreeToArray[0];
    return update(nodePathTreeToArray[0], {
        $apply: (nodeData) => ({
            ...nodeData,
            ...data
        })
    })
}

/**
 * Delete last item in treePath
 * @param nodePathTreeToArray | array | required min length 2
 */
export function deleteNodeTreePathLast(nodePathTreeToArray) {
    let nodeParent = nodePathTreeToArray[nodePathTreeToArray.length - 2];

    let nodeChild = nodePathTreeToArray[nodePathTreeToArray.length - 1];
    let nodeChildIndex = nodeParent.children.findIndex((node) => node.id === nodeChild.id);

    nodeParent = update(nodeParent, {
        children: {
            $splice: [[nodeChildIndex, 1]]
        }
    })

    let newNodeUpdate = updateNodeTreePathLast([
        ...nodePathTreeToArray.slice(0, nodePathTreeToArray.length - 2),
        ...[nodeParent]
    ], nodeParent);

    return newNodeUpdate;
}

/**
 * Delete node in data
 * @param treeData
 * @param id
 * @param path
 * @returns {*}
 */
export function deleteNodeData(treeData = [], id = '', path = []) {
    if (path.length === 1) {
        const menuIndex = treeData.findIndex(menu => menu.id === id);
        if (menuIndex < 0) return false;
        return update(treeData, {
            $splice: [[menuIndex, 1]]
        });
    }
    else {
        // Convert treeData, with path to array level 1
        let nodePathTreeToArray = convertNodeTreeToArray(treeData, path);

        // Update new node level 1 from array lastted
        let newNodeFirstUpdate = deleteNodeTreePathLast(nodePathTreeToArray);
        const newNodeFirstUpdateIndex = treeData.findIndex(node => node.id === newNodeFirstUpdate.id);

        // Update tree Data
        if (newNodeFirstUpdateIndex > -1) {
            return update(treeData, {
                [newNodeFirstUpdateIndex]: {
                    $set: newNodeFirstUpdate
                }
            })
        }
    }
    return treeData;
}

/**
 * Update node data
 * @param treeData | Array data
 * @param path | path update node in tree
 * @param data | data for node
 * @returns {*}
 */
export function updateNodeData(treeData, path, data) {
    let nodePathTreeToArray = convertNodeTreeToArray(treeData, path);
    console.log(path);
    // Update new node level 1 from array lastted
    let newNodeFirstUpdate = updateNodeTreePathLast(nodePathTreeToArray, data);
    const newNodeFirstUpdateIndex = treeData.findIndex(node => node.id === newNodeFirstUpdate.id);

    // Update tree Data
    if (newNodeFirstUpdateIndex > -1) {
        return update(treeData, {
            [newNodeFirstUpdateIndex]: {
                $set: newNodeFirstUpdate
            }
        })
    }
    return treeData;
}

