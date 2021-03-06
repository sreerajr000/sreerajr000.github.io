#include <bits/stdc++.h>

#define INF 200009

using namespace std;

typedef pair<int, int> ii;
vector<list<ii> > adj;
int V, E;

void dijkstra(int s){ 

	vector<int> dist(V, INF);
	dist[s] = 0; // INF = 2.10^9 not MAX_INT to avoid overflow

	priority_queue<ii, vector<ii>, greater<ii> > pq; 

	pq.push(ii(0, s)); // sort by distance

	while (!pq.empty()) { // main loop
		ii top = pq.top();
		pq.pop(); // greedy: pick shortest unvisited vertex
		int d = top.first, u = top.second;
		if (d == dist[u]){ // This check is important! We want to process vertex u only once but we can
		// actually enqueue u several times in priority_queue... Fortunately, other occurrences of u
		// in priority_queue will have greater distances and can be ignored (the overhead is small)
			for(auto it : adj[u]) { // all outgoing edges from u
				int v = it.first, weight_u_v = it.second;
				if (dist[u] + weight_u_v < dist[v]) { // if can relax
					dist[v] = dist[u] + weight_u_v; // relax
					pq.push(ii(dist[v], v)); // enqueue this neighbor
				}   
			} 

		}
	}                          // regardless whether it is already in pq or not
	for(auto x: dist)
		cout << x << " ";
}


int main() {
	
	cin >> V >> E;
	adj.resize(V);

	for(int i = 0; i < E; i++){
		int u, v, w;
		cin >> u >> v >> w;
		adj[u].push_back(ii(v, w));
	}

	int src;
	cin >> src;
	dijkstra(src);
}