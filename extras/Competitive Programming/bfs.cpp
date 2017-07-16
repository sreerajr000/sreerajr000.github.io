#include <bits/stdc++.h>

#define WHITE	0
#define GRAY	1
#define BLACK	2
#define NIL	-1

using namespace std;

class Vertex {
public:
	int color;
	int d;
	int parent;
	Vertex() {
		color = WHITE;
		d = INT_MAX;
		parent = NIL;
	}
};


vector<list<int> > adj;
vector<Vertex> vertices;

void BFS(int src) {
	vertices[src].color = GRAY;
	vertices[src].d = 0;
	vertices[src].parent = NIL;

	queue<int> Q;
	Q.push(src);
	while(!Q.empty()) {
		int u = Q.front();
		Q.pop();
		cout << u << " ";
		for(auto v: adj[u]){
			if(vertices[v].color == WHITE){
				vertices[v].color = GRAY;
				vertices[v].d = vertices[u].d + 1;
				vertices[v].parent = u;
				Q.push(v);
			}
		}
		vertices[u].color = BLACK;
	}
}

int main() {
	int V, E;
	cin >> V >> E;
	adj.resize(V);
	vertices.resize(V);

	for(int i = 0; i < E; i++){
		int u, v;
		cin >> u >> v;
		adj[u].push_back(v);
		adj[v].push_back(u);
	}

	int src;
	cin >> src;
	BFS(src);
}