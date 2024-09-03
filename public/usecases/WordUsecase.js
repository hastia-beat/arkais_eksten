class WordUsecase {
    constructor() { }

    // fetch data from API
    async fetchWords(query) {
        // Memanggil API yang diatur di environment variables atau default ke localhost:3333
        const response = await fetch(`${process.env["BACKEND"] || "http://localhost:3333"}/words?search=${query}`);
        
        // Mengecek jika response dari server tidak berhasil
        if (!response.ok) {
            throw new Error('Failed to fetch words');
        }
        
        // Mengembalikan hasil dalam bentuk JSON
        return await response.json();
    }
}

export default WordUsecase;
