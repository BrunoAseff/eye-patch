type target = {
    type: "api" | "web",
    name: string,
    url: string
}

export const targets: target[] = [
    {
        type: "api", 
        name: "Flaira",
        url: "https://api.flaira.net/status"
    },
    {
        type: "web", 
        name: "Flaira",
        url: "https://flaira.net"
    },
    {
        type: "web", 
        name: "Portfólio",
        url: "https://brunoaseff.com.br"
    },
    {
        type: "web", 
        name: "Nova",
        url: "https://novaspaces.io"
    },
]