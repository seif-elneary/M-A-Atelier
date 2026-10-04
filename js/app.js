document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // Get Elements
    // ==========================================

    const form =
        document.getElementById("orderForm");

    const imageInput =
        document.getElementById("dressImage");

    const imagePreview =
        document.getElementById("imagePreview");

    const totalInput =
        document.getElementById("totalAmount");

    const paidInput =
        document.getElementById("paidAmount");

    const remainingInput =
        document.getElementById("remainingAmount");

    const orderNumberElement =
        document.getElementById("orderNumber");


    // ==========================================
    // Current Order
    // ==========================================

    let savedOrder = null;

    try {

        const storedOrder =
            sessionStorage.getItem("amOrder");

        if (storedOrder) {

            savedOrder =
                JSON.parse(storedOrder);

        }

    } catch (error) {

        console.error(
            "Error reading saved order:",
            error
        );

    }


    // ==========================================
    // Edit Mode
    // ==========================================

    const isEditMode =
        sessionStorage.getItem("amEditMode") === "true";


    // ==========================================
    // Generate / Get Order Number
    // ==========================================

    let currentOrderCounter =
        Number(
            sessionStorage.getItem(
                "amOrderCounter"
            )
        ) || 0;


    let orderNumber;


    if (
        isEditMode &&
        savedOrder &&
        savedOrder.orderNumber
    ) {

        // Keep the same order number

        orderNumber =
            savedOrder.orderNumber;

    } else {

        // Show the next number
        // but DON'T save it yet

        orderNumber =
            "ORDER-" +
            String(
                currentOrderCounter + 1
            ).padStart(3, "0");

    }


    if (orderNumberElement) {

        orderNumberElement.textContent =
            orderNumber;

    }


    // ==========================================
    // Fill Form When Editing
    // ==========================================

    function fillEditData() {

        if (!isEditMode ||
            !savedOrder
        ) {

            return;

        }


        const dressName =
            document.getElementById(
                "dressName"
            );

        const bookingDate =
            document.getElementById(
                "bookingDate"
            );

        const eventDate =
            document.getElementById(
                "eventDate"
            );

        const receiveDate =
            document.getElementById(
                "receiveDate"
            );

        const deliveryDate =
            document.getElementById(
                "deliveryDate"
            );

        const groomName =
            document.getElementById(
                "groomName"
            );

        const brideName =
            document.getElementById(
                "brideName"
            );

        const phoneOne =
            document.getElementById(
                "phoneOne"
            );

        const phoneTwo =
            document.getElementById(
                "phoneTwo"
            );

        const insurance =
            document.getElementById(
                "insurance"
            );

        const notes =
            document.getElementById(
                "notes"
            );


        // ==================================
        // Fill Text Fields
        // ==================================

        if (dressName) {

            dressName.value =
                savedOrder.dressName || "";

        }


        if (bookingDate) {

            bookingDate.value =
                savedOrder.bookingDate || "";

        }


        if (eventDate) {

            eventDate.value =
                savedOrder.eventDate || "";

        }


        if (receiveDate) {

            receiveDate.value =
                savedOrder.receiveDate || "";

        }


        if (deliveryDate) {

            deliveryDate.value =
                savedOrder.deliveryDate || "";

        }


        if (groomName) {

            groomName.value =
                savedOrder.groomName || "";

        }


        if (brideName) {

            brideName.value =
                savedOrder.brideName || "";

        }


        if (phoneOne) {

            phoneOne.value =
                savedOrder.phoneOne || "";

        }


        if (phoneTwo) {

            phoneTwo.value =
                savedOrder.phoneTwo || "";

        }


        if (totalInput) {

            totalInput.value =
                savedOrder.total || "";

        }


        if (paidInput) {

            paidInput.value =
                savedOrder.paid || "";

        }


        if (remainingInput) {

            remainingInput.value =
                savedOrder.remaining || "";

        }


        if (insurance) {

            insurance.value =
                savedOrder.insurance || "";

        }


        if (notes) {

            notes.value =
                savedOrder.notes || "";

        }


        // ==================================
        // Show Saved Image
        // ==================================

        if (
            savedOrder.image &&
            imagePreview
        ) {

            imagePreview.innerHTML =
                "";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                savedOrder.image;


            image.alt =
                "Dress Image";


            image.style.width =
                "100%";

            image.style.maxWidth =
                "350px";

            image.style.height =
                "auto";

            image.style.display =
                "block";

            image.style.margin =
                "20px auto";

            image.style.borderRadius =
                "15px";

            image.style.objectFit =
                "cover";


            imagePreview.appendChild(
                image
            );

        }

    }


    // Fill data after page is ready

    fillEditData();


    // ==========================================
    // IMAGE PREVIEW
    // ==========================================

    if (imageInput) {

        imageInput.addEventListener(
            "change",
            function() {

                const file =
                    imageInput.files[0];


                if (!file) {

                    return;

                }


                // Check image

                if (!file.type.startsWith(
                        "image/"
                    )) {

                    alert(
                        "من فضلك اختر صورة فقط."
                    );

                    imageInput.value =
                        "";

                    return;

                }


                // Read image

                const reader =
                    new FileReader();


                reader.onload =
                    function(event) {

                        if (!imagePreview) {

                            return;

                        }


                        imagePreview.innerHTML =
                            "";


                        const image =
                            document.createElement(
                                "img"
                            );


                        image.src =
                            event.target.result;


                        image.alt =
                            "Dress Image";


                        image.style.width =
                            "100%";

                        image.style.maxWidth =
                            "350px";

                        image.style.height =
                            "auto";

                        image.style.display =
                            "block";

                        image.style.margin =
                            "20px auto";

                        image.style.borderRadius =
                            "15px";

                        image.style.objectFit =
                            "cover";


                        imagePreview.appendChild(
                            image
                        );

                    };


                reader.onerror =
                    function() {

                        alert(
                            "حدث خطأ أثناء قراءة الصورة."
                        );

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    // ==========================================
    // Calculate Remaining
    // ==========================================

    function calculateRemaining() {

        if (!totalInput ||
            !paidInput ||
            !remainingInput
        ) {

            return;

        }


        const total =
            Number(
                totalInput.value
            ) || 0;


        const paid =
            Number(
                paidInput.value
            ) || 0;


        let remaining =
            total - paid;


        if (remaining < 0) {

            remaining = 0;

        }


        remainingInput.value =
            remaining;

    }


    if (totalInput) {

        totalInput.addEventListener(
            "input",
            calculateRemaining
        );

    }


    if (paidInput) {

        paidInput.addEventListener(
            "input",
            calculateRemaining
        );

    }


    // ==========================================
    // Submit Form
    // ==========================================

    if (form) {

        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                // ==================================
                // Get Form Data
                // ==================================

                const dressName =
                    document.getElementById(
                        "dressName"
                    ).value.trim();


                const bookingDate =
                    document.getElementById(
                        "bookingDate"
                    ).value;


                const eventDate =
                    document.getElementById(
                        "eventDate"
                    ).value;


                const receiveDate =
                    document.getElementById(
                        "receiveDate"
                    ).value;


                const deliveryDate =
                    document.getElementById(
                        "deliveryDate"
                    ).value;


                const groomName =
                    document.getElementById(
                        "groomName"
                    ).value.trim();


                const brideName =
                    document.getElementById(
                        "brideName"
                    ).value.trim();


                const phoneOne =
                    document.getElementById(
                        "phoneOne"
                    ).value.trim();


                const phoneTwo =
                    document.getElementById(
                        "phoneTwo"
                    ).value.trim();


                const total =
                    document.getElementById(
                        "totalAmount"
                    ).value;


                const paid =
                    document.getElementById(
                        "paidAmount"
                    ).value;


                const remaining =
                    document.getElementById(
                        "remainingAmount"
                    ).value;


                const insurance =
                    document.getElementById(
                        "insurance"
                    ).value.trim();


                const notes =
                    document.getElementById(
                        "notes"
                    ).value.trim();


                // ==================================
                // Validation
                // ==================================

                if (dressName === "") {

                    alert(
                        "من فضلك اكتب اسم / موديل الفستان."
                    );

                    document
                        .getElementById(
                            "dressName"
                        )
                        .focus();

                    return;

                }


                if (phoneOne === "") {

                    alert(
                        "من فضلك اكتب رقم الهاتف الأول."
                    );

                    document
                        .getElementById(
                            "phoneOne"
                        )
                        .focus();

                    return;

                }


                if (
                    total === "" ||
                    Number(total) <= 0
                ) {

                    alert(
                        "من فضلك اكتب المبلغ الإجمالي."
                    );

                    document
                        .getElementById(
                            "totalAmount"
                        )
                        .focus();

                    return;

                }


                if (
                    Number(paid) >
                    Number(total)
                ) {

                    alert(
                        "المدفوع لا يمكن أن يكون أكبر من الإجمالي."
                    );

                    document
                        .getElementById(
                            "paidAmount"
                        )
                        .focus();

                    return;

                }


                // ==================================
                // Get / Generate Order Number
                // ==================================

                let orderCounter =
                    Number(
                        sessionStorage.getItem(
                            "amOrderCounter"
                        )
                    ) || 0;


                let finalOrderNumber;


                if (
                    isEditMode &&
                    savedOrder &&
                    savedOrder.orderNumber
                ) {

                    // Editing:
                    // Keep the same number

                    finalOrderNumber =
                        savedOrder.orderNumber;

                } else {

                    // New order:
                    // Increase counter only now

                    orderCounter++;


                    finalOrderNumber =
                        "ORDER-" +
                        String(
                            orderCounter
                        ).padStart(
                            3,
                            "0"
                        );

                }


                // ==================================
                // Save Order
                // ==================================

                function saveOrder(
                    imageData
                ) {

                    const order = {

                        orderNumber: finalOrderNumber,

                        dressName: dressName,

                        bookingDate: bookingDate,

                        eventDate: eventDate,

                        receiveDate: receiveDate,

                        deliveryDate: deliveryDate,

                        groomName: groomName,

                        brideName: brideName,

                        phoneOne: phoneOne,

                        phoneTwo: phoneTwo,

                        total: total,

                        paid: paid,

                        remaining: remaining,

                        insurance: insurance,

                        notes: notes,

                        image: imageData,

                        createdAt:
                            (
                                savedOrder &&
                                savedOrder.createdAt
                            ) ?
                            savedOrder.createdAt :
                            new Date().toISOString()

                    };


                    // ==================================
                    // Update Counter
                    // Only for NEW orders
                    // ==================================

                    if (!isEditMode) {

                        sessionStorage.setItem(
                            "amOrderCounter",
                            orderCounter
                        );

                    }


                    // ==================================
                    // Save Current Order
                    // ==================================

                    sessionStorage.setItem(
                        "amOrder",
                        JSON.stringify(order)
                    );


                    // ==================================
                    // Exit Edit Mode
                    // ==================================

                    sessionStorage.removeItem(
                        "amEditMode"
                    );


                    // ==================================
                    // Go To Preview
                    // ==================================

                    window.location.href =
                        "order-preview.html";

                }


                // ==================================
                // Image Handling
                // ==================================

                if (
                    imageInput &&
                    imageInput.files.length > 0
                ) {

                    const file =
                        imageInput.files[0];


                    const reader =
                        new FileReader();


                    reader.onload =
                        function(event) {

                            saveOrder(
                                event.target.result
                            );

                        };


                    reader.onerror =
                        function() {

                            alert(
                                "حدث خطأ أثناء قراءة صورة الفستان."
                            );

                        };


                    reader.readAsDataURL(file);

                } else {

                    // If editing and no new image
                    // was selected, keep old image

                    if (
                        isEditMode &&
                        savedOrder &&
                        savedOrder.image
                    ) {

                        saveOrder(
                            savedOrder.image
                        );

                    } else {

                        saveOrder("");

                    }

                }

            }
        );

    }

});