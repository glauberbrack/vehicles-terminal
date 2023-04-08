"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);





const { describe, it } = mocha
const { expect } = chai;

describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '2 Bike,Skate 100 2023-01-01 2023-01-05'
    )

    const expected = {
      from: "2023-01-01",
      to: "2023-01-05",
      vehicles: ["Bike", "Skate"],
      kmTraveled: "100",
      id: "2",
    };

    expect(person).to.be.deep.equal(expected);
  })

   it("should format a personvalues", () => {
     const person = new Person({
       from: "2023-01-01",
       to: "2023-01-05",
       vehicles: ["Bike", "Skate"],
       kmTraveled: "100",
       id: "2",
     });

     const formatted = person.formatted("en")

     const expected = {
       id: 2,
       vehicles: "Bike and Skate",
       kmTraveled: "100 km",
       from: "January 01, 2023",
       to: "January 05, 2023",
     };

     expect(formatted).to.be.deep.equal(expected);
   });
})