import Hero from "@/components/Hero"
import { stringify } from "postcss"

export default function Home() {
    const snippits = [
        {
            title: "random 01",
            code: String(`${
                <div>
                    <motion.p 
                        className='text-text bg-primary-button absolute px-4 py-2 rounded-lg shadow-lg z-10'
                        animate={{ y: [null, '0.5rem', '0rem'] }}
                        transition={{ delay: 3, times: [0, 0.2, 1] }}
                    >
                        CTRL + C
                    </motion.p>
                    <p className='text-black bg-black/50 relative px-4 py-2 rounded-lg shadow-lg top-2'>CTRL + C</p>
                </div>
            }`),
            tags: ["hello", "world"],
            votes: 15,
            favorite: true
        },
        // {
        //     title: "random 02 yay",
        //     code: toString(
        //         <motion.p 
        //             initial={{ opacity: 0 }}
        //             animate={{ opacity: 1 }}
        //             transition={{ delay: 4.5 }}
        //             className='text-text/50 text-center mt-5 text-xl'
        //         >
        //                 let Snippity = "The home of copy paste."
        //         </motion.p>
        //     ),
        //     tags: ["apple", "trackpad"],
        //     votes: 54,
        //     favorite: false
        // }
    ]
	
	return (
		<main>
			<Hero />
			Hello World
		</main>
	)
}
