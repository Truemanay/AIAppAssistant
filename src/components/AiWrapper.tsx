/**
 * redacted
 */

// import _ from 'lodash';
// import React, { createContext, ReactNode, useEffect, useState } from 'react';
// import { Button, TextInput, TouchableOpacity } from 'react-native';
// import { useSuperSelector } from '../util/customComparators';
// import { setAppStructureObject } from '../redux/appStructure/thunkActions';
// import { useDispatch } from "../redux";


// // const setAppStructureObject = (state: tAppStructureState, screenName: string, newActions: string[]): tAppStructureState => {
// //     // Find the screen index
// //     const screenIndex = state.screens.findIndex(screen => screen.name === screenName);

// //     if (screenIndex !== -1) {
// //         // Screen exists, add new actions if they are not already present
// //         newActions.forEach(action => {
// //             if (!state.screens[screenIndex].actions.includes(action)) {
// //                 state.screens[screenIndex].actions.push(action);
// //             }
// //         });
// //     } else {
// //         // Screen does not exist, add new screen with actions
// //         state.screens.push({ actions: newActions, name: screenName });
// //     }
// //     console.log("APP STRUCTURE: ", state);
// //     console.log("APP STRUCTURE ACTIONS: ", state.screens[screenIndex]?.actions);
// //     store.dispatch({ type: "SET_APP_STRUCTURE", state });
// //     return state;
// // };

// // Define the type for the context
// interface InteractableContextProps {
//     interactables: React.ReactNode[];
//     addInteractable: (component: React.ReactNode) => void;
// }

// // Create the context
// export const InteractableContext = createContext<InteractableContextProps>({
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     addInteractable: () => { },
//     interactables: [],
// });

// const isInteractableComponent = (child: React.ReactNode): boolean => {
//     const interactableComponents = [Button, TextInput, TouchableOpacity];
//     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
//     return interactableComponents.includes((child as any).type);
// };

// interface AiWrapperProps {
//     children: ReactNode;
//     screenName: string;
// }

// const AiWrapper: React.FC<AiWrapperProps> = ({ children, screenName }) => {

//     const dispatch = useDispatch();
//     const rAppStructureReducer = useSuperSelector((state) => state.AppStructureReducer);
//     const aAppStructure = _.cloneDeep(rAppStructureReducer);
//     const [interactables, setInteractables] = useState<React.ReactNode[]>([]);
//     // console.log("IS IT UNDFINDED", rAppStructureReducer);
//     // console.log("IS IT UNDFINDED", aAppStructure);

//     const addInteractable = (component: React.ReactNode) => {
//         setInteractables((current) => [...current, component]);
//     };



//     useEffect(() => {
//         if (children) {
//             // A recursive function to get all interactable components
//             const findAllInteractables = (nodes: React.ReactNode) => {
//                 let currInteractables = [];
//                 React.Children.forEach(nodes, (node, index) => {
//                     if (node && typeof node === 'object' && 'type' in node) {
//                         if (isInteractableComponent(node)) {

//                             // console.log("Node", node);
//                             if (!node.props.accessible) console.warn(`No accessible label found for this component ${index}: `, node, "\nOn screen ", screenName);
//                             interactables.push(node);
//                         }

//                         // If the node has children, recursively find interactables within
//                         if (node.props && node.props.children) {
//                             currInteractables = interactables.concat(findAllInteractables(node.props.children));
//                         }

//                         if (node.props && node.props.children && node.props.children.props && node.props.children.props.children) {
//                             currInteractables = interactables.concat(findAllInteractables(node.props.children));
//                         }
//                     }
//                 });
//                 return interactables;
//             };
//             if (children) {
//                 const newInteractables = findAllInteractables(children);
//                 // console.log("Interactables", newInteractables);
//                 // console.log("Interactable", newInteractables[0]);
//                 // console.log("Accessible: ", newInteractables[0]?.props.accessible);
//                 const newActions: string[] = [];
//                 newInteractables.forEach(interactable => {
//                     // interactable ?
//                     if (interactable?.props.accessible) {
//                         newActions.push(interactable?.props.accessibilityLabel);
//                     }
//                 })
//                 dispatch(setAppStructureObject(aAppStructure, screenName, newActions));
//                 setInteractables(newInteractables);
//             } else {
//                 // If children is undefined or null, set interactables to an empty array
//                 setInteractables([]);
//             }
//         }
//     }, [children, dispatch, interactables, screenName]);


//     // useEffect(() => {
//     //     // Check if children is defined
//     //     console.log("Screen Children", children);
//     //     if (children) {
//     //         const newInteractables = React.Children.map(children, (child) => {
//     //             console.log("child", child);
//     //             if (isInteractableComponent(child)) {
//     //                 return child;
//     //             }
//     //         }).filter(Boolean);
//     //         console.log("interactables", newInteractables);
//     //         setInteractables(newInteractables);
//     //     } else {
//     //         // If children is undefined or null, set interactables to an empty array
//     //         setInteractables([]);
//     //     }
//     // }, [children]); // Only re-run the effect if `children` changes


//     return (
//         <InteractableContext.Provider value={{ addInteractable, interactables }}>
//             {children}
//         </InteractableContext.Provider>
//     );
// };

// export default AiWrapper;
