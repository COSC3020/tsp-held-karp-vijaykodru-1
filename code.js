function tsp_hk(distance_matrix) {
    const n = distance_matrix.length

    // Return 0 if there are no cities or just one.
    if (n <= 1) {
        return 0;
    }

    const memo = {}; //temporarily store results of subproblems.
    const numCities = n; // Number of cities.
    const allCities = Array.from({ length: numCities }, (_, i) => i); // Indices of all cities.

    let minimumTourCost = Infinity; // Initialize the minimum tour cost.

    // Attempt starting the tour from each city.
    for (let startCity = 0; startCity < numCities; startCity++) {
        const tourCost = HK(distance_matrix, startCity, allCities, memo);
        minimumTourCost = Math.min(minimumTourCost, tourCost);
    }

    return minimumTourCost === Infinity ? 0 : minimumTourCost;
}

function HK(distance_matrix, currentCity, remainingCities, memo) {
    // Generate a unique key for memoization.
    const memoKey = `${currentCity}-${JSON.stringify(remainingCities.sort((a, b) => a - b))}`;


    // Return cached value if already computed.
    if (memo[memoKey] !== undefined) {
        return memo[memoKey];
    }

    // Base case: If only two cities remain (pseudocode)
    if (remainingCities.length === 2) {
        const nextCity = remainingCities.find(city => city !== currentCity);
        memo[memoKey] = distance_matrix[currentCity][nextCity];
        return memo[memoKey];
    }

    //largest possible value
    let shortestDistance = Infinity;

    // Iterate over all remaining cities to find the next step. (pseudocode)
    for (const nextCity of remainingCities) {
        if (nextCity !== currentCity) {
            // Compute the remaining cities excluding the current one.
            const reducedCities = remainingCities.filter(city => city !== currentCity);
            // Calculate the cost of visiting the next city and the rest of the tour.
            const tourCost = HK(distance_matrix, nextCity, reducedCities, memo)
                              + distance_matrix[currentCity][nextCity];

            // Update the shortest distance if a better route is found.
            shortestDistance = Math.min(shortestDistance, tourCost);
        }
    }

    // Cache the result before returning it.
    memo[memoKey] = shortestDistance;
    return shortestDistance;
}
