import Image from "next/image";

export default function PeopleAssociated() {
  const people = [
    {
      name: "Ahamd Ekstrom Bothman",
      title: "Future Program Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: {
        src: "/placeholder.svg?height=20&width=20",
        bg: "bg-red-500",
      },
    },
    {
      name: "Sheldon Langosh",
      title: "Dynamic Directives Architect",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: {
        src: "/placeholder.svg?height=20&width=20",
        bg: "bg-blue-500",
      },
    },
    {
      name: "Jeremy Crist",
      title: "Lead Configuration Architect",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: {
        src: "/placeholder.svg?height=20&width=20",
        bg: "bg-gray-800",
      },
    },
    {
      name: "Wilbur Kohler",
      title: "Future Applications Consultant",
      avatar: "/placeholder.svg?height=40&width=40",
      icon: {
        src: "/placeholder.svg?height=20&width=20",
        bg: "bg-orange-500",
      },
    },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        People Associated
      </h2>

      <div className="space-y-4">
        {people.map((person, index) => (
          <div key={index} className="flex items-center">
            <div className="relative">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={person.avatar || "/placeholder.svg"}
                  alt={person.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div
                className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full ${person.icon.bg} flex items-center justify-center border-2 border-white`}
              >
                <Image
                  src={person.icon.src || "/placeholder.svg"}
                  alt="Company icon"
                  width={16}
                  height={16}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{person.name}</p>
              <p className="text-xs text-gray-500">{person.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <button className="text-sm text-gray-600 hover:text-gray-900">
          See all
        </button>
      </div>
    </div>
  );
}
