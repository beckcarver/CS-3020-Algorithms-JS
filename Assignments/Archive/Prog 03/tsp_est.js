//Michael Stoll, W09860657
//Beckham Carver, W09874167
function tsp_ls(distance_matrix)
{
	//code that chooses a random route and sets it equal to incumbent
	var incumbent = [];
	for(var b = 0; b < distance_matrix.length; b++) //sets incumbent equal to a list from 0 to distance_matrix.length - 1
	{
		incumbent.push(b);
	}
	
	for(var a = 0; a < (incumbent.length / 2); a++)
	{
		var first = Math.floor(Math.random() * (incumbent.length - 1));
		var second = Math.floor(Math.random() * (incumbent.length - 1));
		while(first == second)
		{
			var second = Math.floor(Math.random() * incumbent.length);
		}
		var tmp = incumbent[first];
		incumbent[first] = incumbent[second];
		incumbent[second] = tmp;
	}

	var visited = [];
	visited.push(incumbent[0]);
	var keepGoin = true;
	var dist = getDist(distance_matrix, incumbent);
	while(keepGoin)
	{
		keepGoin = false;
		var i;
		var k;
		for(var j = 0; j < incumbent.length - 1; j++) //iterates through incumbent, except for the last element
		{
			var currentWeight = distance_matrix[incumbent[j]][incumbent[j + 1]];
			var length = distance_matrix[j].length;
			for(var l = 0; l < length; l++) //iterates through all of the nodes adjacent to the current node of incumbent
			{
				var beenThere = false;
				for(var m = 0; m < visited.length; m++)
				{
					if(incumbent[l] == visited[m])
					{
						beenThere = true;
					}
				}
				if(!beenThere)
				{
					var newWeight = distance_matrix[incumbent[j]][incumbent[l]];
					if(newWeight < currentWeight)
					{
						visited.push(incumbent[l]);
						i = j + 1;
						k = i
						for(var n = j + 1; n < incumbent.length; n++)
						{
							if(incumbent[l] == incumbent[n])
							{
								k = n;
							}
						}
						l = distance_matrix[j].length;
						j = incumbent.length;
						keepGoin = true;
						var newNew = swap(incumbent, i, k);
						var newDist = getDist(distance_matrix, newNew);
						if(newDist < dist)
						{
							incumbent = newNew;
							dist = newDist;
						}

					}
				}
			}
		}
	}
//console.log(incumbent);
	return dist;
}

function getDist(graph, route)
{
	var sum = 0;
	for(var i = 0; i < route.length - 1; i++)
	{
		sum = sum + graph[route[i]][route[i+1]];
	}
	return sum;
}
function swap(route, i, k)
{
	var finished = [];

	for(var count = 0; count < i; count++)
	{
		finished.push(route[count]);
	}
	var tmp = [];

	for(var count = k; count >= i; count--)
	{
		tmp.push(route[count]);
	}

	finished = finished.concat(tmp);

	for(var count = k + 1; count < route.length; count++)
	{
		finished.push(route[count]);
	}

	return finished;
}

