
import { UniqIndexedList } from "../src/UniqIndexedList";

const testArray = [
  { key: "q", value: 1 },
  { key: "w", value: 2 },
  { key: "e", value: 3 },
];

const addedElement = { key: "r", value: 4 }
const searchElementKey = "q"
const nonExistentElementKey = "a"
const deletedElementKey = "w"
const findIndeces = [-4, -2, -1, 0, 1, 2, 5]

const findElement = (compareKey: any) => testArray.find(el => el.key === compareKey)
const verificationCallback = (el: any) => el.value > 2;

const testIndexList = new UniqIndexedList(testArray,(el)=>el["key"],false)

describe("UniqIndexedList", () => {
 
  // test("it should create new indexes for element in indexedList and return ???", () => {
  //   testIndexList.rebuildIndex();
  //   const output = testIndexList;

  //   expect(true).toEqual(output);
  // })

  // ----at-------
  test("it should get element by index from indexedList", () => {
    findIndeces.forEach(index => {
      const input = testIndexList.at(index);
      const output = testArray.at(index);

      expect(input).toEqual(output);
    })
  })

  // -----getByKey----
 test("it should get element by key from indexedList", () => {
    const input = testIndexList.getByKey(searchElementKey);
    const output = findElement(searchElementKey);

    expect(input).toEqual(output);
  })

  test("it should get non-existent element by key from indexedList", () => {
    const input = testIndexList.getByKey(nonExistentElementKey);
    const output = findElement(nonExistentElementKey);

    expect(input).toEqual(output);
  })

// --------getByKeyA--------------
  test("it should get Array with element by key from indexedList", () => {
    const input = testIndexList.getByKeyA(searchElementKey);
    const output = [findElement(searchElementKey)];

    expect(input).toEqual(output);
  })

  test("it should get Array with non-existent element by key from indexedList", () => {
    const input = testIndexList.getByKeyA(nonExistentElementKey);
    const output = findElement(nonExistentElementKey);

    expect(input).toEqual(output);
  })

// ---------hasKey--------
  test("it should check is has existing element in indexedList ", () => {
    const input = testIndexList.hasKey(searchElementKey);
    const output = true;

    expect(input).toEqual(output);
  })

  test("it should check is has non-existent element in indexedList ", () => {
    const input = testIndexList.hasKey(nonExistentElementKey);
    const output = false;

    expect(input).toEqual(output);
  })

// --------delete-------------
  test("it should delete element with key from indexedList and return it's index", () => {
    const input = testIndexList.delete(deletedElementKey);
    const output = testArray.findIndex(el => el.key === deletedElementKey);
    testArray.splice(output, 1);

    expect(input).toEqual(output);
  })

  // -------add---------
  test("it should add element to indexedList and checking if a new element exists ", () => {
    const newElement = addedElement;
    testIndexList.add(newElement);
    testArray.push(newElement);

    const input = testIndexList.hasKey(newElement.key);
    const output = true;

    expect(input).toEqual(output);
  })

// ---------filter-and-inside-filterIter----------
  test("it should return Array from indexedList's elements for which the expression in the function is true ", () => {
    const input = testIndexList.filter(verificationCallback);
    const output = testArray.filter(verificationCallback);

    expect(input).toEqual(output);
  })

  // ----------forEach-----------
  const forEachTestFunction = (target) => {
    const result = [];
  
    target.forEach(el => {
      // callback
      result.push(el.key);
    })
  
    return result;
  }
  
  test("it should apply callback with all element from indexedList by method 'forEach'", () => {
    const input = forEachTestFunction(testArray);
    const output = forEachTestFunction(testIndexList);

    expect(input).toEqual(output)
  })

  // ---------map-and-inside-mapIter------
  const mapTestFunction = (target) => {
    const result = [];

    target.map(el => {
      // callback
      result.push(el.key);
    })

    return result;
  }

  test("it should apply callback with all element from indexedList by method 'map'", () => {
    const input = mapTestFunction(testArray);
    const output = mapTestFunction(testIndexList);

    expect(input).toEqual(output);
  })

  // ----------length---------------
  test("it should count of element in indexedList by gettter 'lenght'", () => {
    const input = testIndexList.length;
    const output = testArray.length;

    expect(input).toEqual(output);
  })

  // -------copy-------
  test("it should get shadow copy of indexedList", () => {
    const input = testIndexList
    const output = testIndexList.copy();

    // @ts-ignore
    expect(input.index).toEqual(output.index);

    // @ts-ignore
    expect(input.list).toEqual(output.list);
  })

  // -----------some--------
  test("it should if at least one element from indexList passes verificationCallback", () => {
    const input = testIndexList.some(verificationCallback);
    const output = testArray.some(verificationCallback);

    expect(input).toEqual(output);
  })

  // ------slice-and-inside-sliceIter-------
  test("it should get Array from element of indexList between given indices", () => {
    const beginIndex = 1
    const endIndex= 3
    
    const input = testIndexList.slice(beginIndex,endIndex);
    const output = testArray.slice(beginIndex,endIndex);

    expect(input).toEqual(output);
  })

// -----clear-------
  test("it should clear indexedList and make 0 in it's lenght", () => {
    testIndexList.clear() // return nothing but change own data
    const output = testIndexList.length === 0;

    expect(true).toEqual(output);
  })
})

