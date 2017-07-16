#include <bits/stdc++.h>

#define WHITE	0
#define GRAY	1
#define BLACK	2
#define NIL	-1
using namespace std;

class Vertex {
	int color;
	int d;
	int parent;
	Vertex() {
		color = WHITE;
		d = INT_MAX;
		parent = NIL;
	}
};


int main() {
	vector<list> adj;
	int V, E;
	cin >> V >> E;
	adj.resize(V);

	for(int i = 0; i < E; i++){
		int u, v;
		cin >> u >> v;
		adj[u].push_back(v);
		adj[v].push_back(u);
	}
}