import mocha from 'mocha'
import chai from 'chai'

import Vehicle from "../src/vehicle.js";


const { describe, it } = mocha
const { expect } = chai;

describe("Vehicle", () => {
  it("should return a vehicle instance from a string", () => {
    const vehicle = Vehicle.generateInstanceFromString(
      "2 Bike,Skate 100 2023-01-01 2023-01-05"
    );

    const expected = {
      from: "2023-01-01",
      to: "2023-01-05",
      types: ["Bike", "Skate"],
      kmTraveled: "100",
      id: "2",
    };

    expect(vehicle).to.be.deep.equal(expected);
  });

  it("should format a vehicle values", () => {
    const vehicle = new Vehicle({
      from: "2023-01-01",
      to: "2023-01-05",
      types: ["Bike", "Skate"],
      kmTraveled: "100",
      id: "2",
    });

    const formatted = vehicle.formatted("en");

    const expected = {
      id: 2,
      types: "Bike and Skate",
      kmTraveled: "100 km",
      from: "January 01, 2023",
      to: "January 05, 2023",
    };

    expect(formatted).to.be.deep.equal(expected);
  });
});