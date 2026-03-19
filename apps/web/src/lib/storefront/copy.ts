export type StorefrontLocale = "ar" | "en";

export const storefrontCopy = {
  en: {
    common: {
      browseCollections: "Explore collections",
      continueShopping: "Continue shopping",
      continueToCheckout: "Continue to checkout",
      backToAccount: "Back to account",
      finalPriceInclusive: "Final price shown before dispatch confirmation.",
      giftPackagingIncluded: "Included",
      giftPackagingNotSelected: "Not selected",
      localSnapshotMissing:
        "We do not have a local order snapshot yet. If this order was placed with cash on delivery, WhatsApp confirmation is still required before dispatch.",
    },
    product: {
      giftWorthyPiece: "Gift-worthy piece",
      illustrationBy: "Illustration by",
      proofIntro:
        "This page is built to prove quality before checkout: illustration attribution, fabric facts, fit guidance, and delivery terms sit next to the purchase decision.",
      launchPendingTitle: "Launch pending",
      launchPendingBody:
        "This piece is visible for story and discovery, but purchase is paused until all proof standards are complete.",
      launchPendingChecklistTitle: "Still being prepared",
      launchPendingChecklistBody:
        "HORO only opens checkout once artist attribution, product proof, and the full six-shot trust gallery are complete.",
      exchangeCard:
        "Exchange available for 14 days after delivery. If the fit is off, send the tag photo and we will arrange the next step quickly.",
      relatedPieces: "Related pieces",
      moreFromArtist: "More by",
      reviewSummary: "reviews",
      fitLabel: "Fit:",
      riskReduction: {
        shipping: "Nationwide delivery in 3-5 business days.\nCash on delivery is available.",
        exchange: "Need a size change? Free exchange within 14 days.\nMessage us on WhatsApp and we will guide the next step.",
        packaging: "Every piece arrives in HORO signature packaging.\nGift-ready without extra effort.",
      },
      addToCart: {
        sizeLabel: "Choose your size",
        sizeGuide: "Size guide",
        fitHelp: "Need fit help? WhatsApp us with your height and weight.",
        giftPackaging: "Add gift-ready packaging",
        giftPackagingNote: "Rigid gift presentation + artist card + no price on the receipt.",
        addToBag: "Add to bag",
        outOfStock: "Out of stock",
        unavailable: "Unavailable until proof is complete",
      },
      cardArtistFallback: "Artist-linked piece",
      cardLaunchReady: "Launch-ready",
      cardProofInProgress: "Proof in progress",
      buyBox: {
        heading: "Purchase summary",
        shipping: "Cash on delivery is confirmed on WhatsApp before dispatch.",
        prepaid: "Prepaid orders qualify for free shipping and skip the COD confirmation delay.",
        exchange: "14-day exchange window. Cairo/Giza pickup support when eligible.",
        gift: "Gift upgrade stays attached through cart and checkout.",
      },
      reasons: {
        missing_artist_attribution: "Artist attribution is still missing.",
        missing_fabric_composition: "Fabric composition has not been published yet.",
        missing_fabric_weight_gsm: "Fabric GSM proof has not been published yet.",
        missing_print_method: "Print method is not visible yet.",
        missing_wash_test: "Wash-test proof is not complete yet.",
        missing_model_stats: "Both male and female-presenting model stats are required.",
        missing_front_on_body: "Front on-body shot is missing.",
        missing_back_on_body: "Back on-body shot is missing.",
        missing_macro_print_closeup: "Macro print close-up is missing.",
        missing_fabric_tag_detail: "Fabric/tag detail shot is missing.",
        missing_flat_lay_context: "Flat-lay context shot is missing.",
        missing_lifestyle_mood: "Lifestyle shot is missing.",
      },
    },
    cart: {
      title: "Your bag",
      description:
        "Review your pieces, packaging choice, and delivery details before checkout.",
      emptyTitle: "Your bag is empty",
      emptyBody:
        "Choose a piece that feels personal, then return here to confirm sizing, gifting, and delivery.",
      orderSummary: "Order summary",
      items: "Items",
      quantity: "Quantity",
      remove: "Remove",
      giftPackaging: "Gift packaging",
      shippingAtCheckout: "Shipping",
      shippingAtCheckoutValue: "Calculated in checkout",
      totalBeforeShipping: "Total before shipping",
      codNote:
        "Cash on delivery orders are confirmed on WhatsApp before dispatch. Prepaid orders receive free shipping.",
    },
    checkout: {
      title: "Checkout",
      description:
        "Move from shipping to payment to review in one clear flow. Every fee is visible before you place the order.",
      steps: {
        shipping: "Shipping",
        payment: "Payment",
        confirm: "Review",
      },
      fields: {
        email: "Email",
        emailHint: "For order confirmation & shipping updates",
        firstName: "First name",
        lastName: "Last name",
        addressLine: "Address line 1",
        governorate: "Governorate",
        postalCode: "Postal code (optional)",
        phone: "Phone number",
      },
      trustBadges: {
        encrypted: "SSL Encrypted",
        secureCheckout: "Secure Checkout",
        paymob: "Payments via Paymob",
        dataProtected: "Your data is fully encrypted and protected",
      },
      noExtraFees: "Final price includes everything — no extra fees on delivery",
      shippingMethods: {
        standard: {
          title: "Standard delivery",
          eta: "3-5 business days",
          detail: "Reliable delivery across Egypt with WhatsApp updates on dispatch.",
        },
        express: {
          title: "Express delivery",
          eta: "1-2 business days",
          detail: "Faster Cairo/Giza-friendly option when timing matters.",
        },
      },
      paymentMethods: {
        cod: {
          title: "Cash on delivery",
          detail: "We will confirm the order on WhatsApp before dispatch.",
        },
        card: {
          title: "Card payment",
          detail: "Free shipping and no COD confirmation delay.",
        },
        wallet: {
          title: "Mobile wallet",
          detail: "Free shipping and faster dispatch confirmation.",
        },
      },
      notes: {
        cod: "Reply with confirmation on WhatsApp before dispatch so your package ships on time.",
        prepaid:
          "Prepaid orders qualify for free shipping and move directly to dispatch preparation.",
      },
      review: {
        title: "Review your order",
        shippingTo: "Shipping",
        payment: "Payment",
        giftPackaging: "Gift packaging",
        subtotal: "Subtotal",
        shipping: "Shipping",
        total: "Total",
      },
      buttons: {
        toPayment: "Continue to payment",
        toReview: "Review order",
        placeOrder: "Place order",
        placingOrder: "Placing order...",
      },
      success: {
        completingOrder: "Completing your order...",
      },
      errors: {
        emptyCart: "Your bag is empty. Add items before checkout.",
        shippingSave:
          "We could not save your shipping details yet. You can still continue and try again on order placement.",
        paymentSession:
          "Payment setup could not be prepared yet. Review is still available.",
        placementFailed:
          "Order placement did not complete with the backend, but your details were saved locally.",
        email: "Email is required.",
        firstName: "First name is required.",
        lastName: "Last name is required.",
        addressLine: "Address line 1 is required.",
        governorate: "Choose a governorate.",
        phone: "Enter a valid phone number.",
      },
    },
    order: {
      title: "Order confirmed",
      description: "Thank you. Your order has been received and the next steps are clear below.",
      codNote:
        "If you chose cash on delivery, we will send a WhatsApp confirmation within 2 hours before dispatch.",
      details: "Order details",
      items: "Items",
      payment: "Payment",
      shipping: "Shipping",
      giftPackaging: "Gift packaging",
      total: "Total",
      deliveryArea: "Delivery area",
      phone: "Phone",
      snapshotTitle: "What happens next",
      snapshotBody:
        "We will confirm your delivery window, send tracking when the shipment leaves, and keep exchanges frictionless if sizing needs adjustment.",
    },
    sizeGuide: {
      title: "Size guide",
      description:
        "Measure against the table below, then use the product-page model stats and WhatsApp fit help if you are between sizes.",
      fitTip:
        "Need a recommendation? Send your height and weight on WhatsApp and we will suggest the best size.",
      howToMeasureTitle: "How to read the table",
      howToMeasureBody:
        "Chest is measured around the fullest part. Length is from the shoulder seam to the hem. Shoulder is measured seam to seam.",
    },
    gifts: {
      title: "HORO gifts",
      description:
        "Gifting is a core HORO use case, not an add-on. Packaging, artist context, and delivery clarity should make the piece ready to hand over.",
      standardOrder: "Standard order",
      standardBody:
        "Minimal branded mailer or rigid mailer, tissue wrap, sticker seal, artist card, and Arabic care/returns insert.",
      giftUpgrade: "Gift upgrade",
      giftUpgradeBody:
        "Rigid gift box, layered presentation, and a handwritten-style tag that feels ready to hand over.",
      giftCriteria: "When it feels gift-worthy",
      giftCriteriaBody:
        "Sizing is clear, delivery is reliable, and the final price already includes the real fees.",
    },
    artists: {
      title: "The Archive",
      description: "Meet the collaborators whose illustrations shape each HORO piece.",
      emptyTitle: "The Archive will be updated soon",
      emptyBody:
        "New collaborations are being prepared. The product pages will link each live piece back to its origin in the archive.",
    },
    stories: {
      title: "Stories",
      description: "Artist stories, collection context, and the thinking behind each drop.",
      emptyTitle: "Stories will appear here soon",
      emptyBody:
        "When editorial stories are published, this space will connect the illustration to the drop and the occasion behind it.",
    },
    account: {
      title: "Account",
      description:
        "Review your latest local checkout snapshot, service promises, and the fastest routes back to support.",
      servicePromise: "Service promise",
      latestOrder: "Latest order",
      viewOrderDetails: "View order details",
      noOrder:
        "No completed order is stored locally yet. Your next checkout will appear here automatically.",
      viewOrders: "View orders",
      ordersTitle: "Orders",
      ordersDescription:
        "Recent checkout snapshots are stored locally until full account authentication is connected.",
      promiseItems: [
        "Arabic-first storefront with clear English support across key shopping surfaces.",
        "WhatsApp support for sizing, COD confirmation, and delivery updates.",
        "14-day exchange window from delivery date.",
      ],
    },
    policies: {
      exchangeTitle: "Exchange & returns",
      exchangeLines: [
        "14-day exchange window from delivery date.",
        "Send a photo of the tag and your preferred size to start the exchange.",
        "Cairo/Giza exchanges include pickup support. Other areas ship back to HORO.",
        "Defective print or fabric receives a full replacement and apology art print.",
      ],
      shippingTitle: "Shipping",
      privacyTitle: "Privacy",
      privacyBody:
        "We use your data to process orders, send WhatsApp confirmations, and improve service. We do not sell your data.",
      privacyContact: "For privacy questions",
    },
    footer: {
      brand: "Brand",
      shop: "Shop",
      customerService: "Customer Service",
      aboutHoro: "About HORO",
      newArrivals: "New Arrivals",
      themes: "Themes",
      limitedEditions: "Limited Editions",
      giftSets: "Gift Sets",
      exchangePolicy: "Exchange Policy",
      shippingDelivery: "Shipping & Delivery",
      paymentMethods: "Payment Methods",
      faq: "FAQs",
      orderTracking: "Order Tracking",
      ourStory: "Our Story",
      ourArtists: "The Atelier",
      contact: "Contact",
      terms: "Terms",
      registration: "Commercial Registration",
      taxRegistration: "Tax Registration",
    },
    home: {
      seasonalMoment: {
        cta: "Shop gifts",
      },
      continueBrowsing: {
        title: "Continue browsing",
        kicker: "Pick up where you left off",
      },
    },
    collections: {
      title: "Collections",
      description:
        "Curated stories that move from theme to artist to piece, with gifting and trust built into the buying journey.",
      empty: "No pieces in this collection are launch-ready yet.",
      pendingNote:
        "Some pieces may be visible in story context while proof requirements are still being completed.",
    },
  },
  ar: {
    common: {
      browseCollections: "استكشف المجموعات",
      continueShopping: "تابع التسوق",
      continueToCheckout: "تابع إلى الدفع",
      backToAccount: "الرجوع إلى الحساب",
      finalPriceInclusive: "السعر النهائي ظاهر قبل تأكيد الإرسال.",
      giftPackagingIncluded: "مضاف",
      giftPackagingNotSelected: "غير مضاف",
      localSnapshotMissing:
        "لا توجد لدينا لقطة محلية لهذا الطلب بعد. إذا كان الطلب دفع عند الاستلام فسيظل تأكيد واتساب مطلوباً قبل الإرسال.",
    },
    product: {
      giftWorthyPiece: "قطعة جاهزة للإهداء",
      illustrationBy: "العمل الفني من",
      proofIntro:
        "الصفحة دي مبنية لإثبات الجودة قبل الدفع: نسب الفنان، تفاصيل القماش، توضيح المقاس، وشروط التوصيل كلها بجانب قرار الشراء.",
      launchPendingTitle: "الإطلاق مؤجل",
      launchPendingBody:
        "القطعة ظاهرة للاكتشاف والقصة، لكن الشراء متوقف لحد ما يكتمل نظام الإثبات بالكامل.",
      launchPendingChecklistTitle: "ما الذي ما زال قيد التجهيز",
      launchPendingChecklistBody:
        "HORO لا يفتح الشراء إلا بعد اكتمال نسب الفنان، وإثبات المنتج، ومعرض الثقة المكوّن من 6 لقطات.",
      exchangeCard:
        "الاستبدال متاح خلال 14 يوم من الاستلام. لو المقاس غير مناسب، ابعت صورة التيكت وسنرتب الخطوة التالية بسرعة.",
      relatedPieces: "قطع مرتبطة",
      moreFromArtist: "المزيد من",
      reviewSummary: "تقييم",
      fitLabel: "القصّة:",
      riskReduction: {
        shipping: "شحن لكل المحافظات خلال 3-5 أيام عمل.\nالدفع عند الاستلام متاح.",
        exchange: "محتاج تبديل مقاس؟ استبدال مجاني خلال 14 يوم.\nكلمنا واتساب وسنوضح لك الخطوة التالية.",
        packaging: "كل قطعة بتوصل في تغليف HORO المميز.\nجاهزة كهدية من غير مجهود إضافي.",
      },
      addToCart: {
        sizeLabel: "اختر المقاس",
        sizeGuide: "دليل المقاسات",
        fitHelp: "تحتاج مساعدة في المقاس؟ ابعت الطول والوزن على واتساب.",
        giftPackaging: "أضف تغليف هدية",
        giftPackagingNote: "تقديم هدية صلب + بطاقة فنان + بدون سعر على الإيصال.",
        addToBag: "أضف إلى السلة",
        outOfStock: "نفدت الكمية",
        unavailable: "غير متاح للشراء قبل اكتمال الإثبات",
      },
      cardArtistFallback: "قطعة فنية مرتبطة بفنان",
      cardLaunchReady: "جاهزة للشراء",
      cardProofInProgress: "إثبات قيد التجهيز",
      buyBox: {
        heading: "ملخص الشراء",
        shipping: "طلبات الدفع عند الاستلام يتم تأكيدها على واتساب قبل الإرسال.",
        prepaid: "الطلبات المدفوعة أونلاين تحصل على شحن مجاني وتتخطى تأخير تأكيد الـ COD.",
        exchange: "استبدال خلال 14 يوم. دعم استلام في القاهرة/الجيزة عند انطباق الشروط.",
        gift: "ترقية الهدية تظل مضافة معك حتى السلة والدفع.",
      },
      reasons: {
        missing_artist_attribution: "نسب الفنان لم يكتمل بعد.",
        missing_fabric_composition: "تركيب القماش غير منشور بعد.",
        missing_fabric_weight_gsm: "رقم الـ GSM غير ظاهر بعد.",
        missing_print_method: "طريقة الطباعة غير واضحة بعد.",
        missing_wash_test: "إثبات اختبار الغسيل غير مكتمل بعد.",
        missing_model_stats: "لازم تظهر بيانات موديل رجالي وأنثوي معاً.",
        missing_front_on_body: "صورة أمامية على الجسم غير موجودة.",
        missing_back_on_body: "صورة خلفية على الجسم غير موجودة.",
        missing_macro_print_closeup: "لقطة ماكرو للطباعة غير موجودة.",
        missing_fabric_tag_detail: "لقطة القماش/التيكت غير موجودة.",
        missing_flat_lay_context: "لقطة فلات لاي غير موجودة.",
        missing_lifestyle_mood: "اللقطة المزاجية غير موجودة.",
      },
    },
    cart: {
      title: "سلتك",
      description: "راجع القطع، اختيار التغليف، وتفاصيل التوصيل قبل الانتقال للدفع.",
      emptyTitle: "السلة فارغة",
      emptyBody:
        "اختر قطعة تشبهك أو تناسب الهدية، ثم ارجع هنا لتأكيد المقاس والتغليف والتوصيل.",
      orderSummary: "ملخص الطلب",
      items: "القطع",
      quantity: "الكمية",
      remove: "حذف",
      giftPackaging: "تغليف هدية",
      shippingAtCheckout: "الشحن",
      shippingAtCheckoutValue: "يتم حسابه في الدفع",
      totalBeforeShipping: "الإجمالي قبل الشحن",
      codNote:
        "طلبات الدفع عند الاستلام يتم تأكيدها على واتساب قبل الإرسال. الطلبات المدفوعة أونلاين تحصل على شحن مجاني.",
    },
    checkout: {
      title: "إتمام الطلب",
      description:
        "تحرك من الشحن إلى الدفع ثم المراجعة في مسار واضح واحد. كل الرسوم ظاهرة قبل تنفيذ الطلب.",
      steps: {
        shipping: "الشحن",
        payment: "الدفع",
        confirm: "المراجعة",
      },
      fields: {
        email: "البريد الإلكتروني",
        emailHint: "لإرسال تأكيد الطلب وتتبع الشحنة",
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        addressLine: "العنوان",
        governorate: "المحافظة",
        postalCode: "الرقم البريدي (اختياري)",
        phone: "رقم الهاتف",
      },
      trustBadges: {
        encrypted: "تشفير SSL",
        secureCheckout: "دفع آمن",
        paymob: "مدفوعات عبر Paymob",
        dataProtected: "بياناتك مشفرة ومحمية بالكامل",
      },
      noExtraFees: "السعر النهائي شامل كل شيء — مفيش رسوم إضافية عند الاستلام",
      shippingMethods: {
        standard: {
          title: "شحن عادي",
          eta: "3-5 أيام عمل",
          detail: "توصيل موثوق داخل مصر مع تحديثات واتساب عند الإرسال.",
        },
        express: {
          title: "شحن سريع",
          eta: "1-2 يوم عمل",
          detail: "خيار أسرع مناسب خصوصاً عندما يهم الوقت.",
        },
      },
      paymentMethods: {
        cod: {
          title: "الدفع عند الاستلام",
          detail: "سنؤكد الطلب على واتساب قبل الإرسال.",
        },
        card: {
          title: "بطاقة بنكية",
          detail: "شحن مجاني وبدون انتظار تأكيد COD.",
        },
        wallet: {
          title: "محفظة إلكترونية",
          detail: "شحن مجاني وتجهيز أسرع بعد التأكيد.",
        },
      },
      notes: {
        cod: "ردّ على رسالة واتساب بالتأكيد قبل الإرسال حتى يخرج طلبك في الوقت المناسب.",
        prepaid: "الطلبات المدفوعة أونلاين تحصل على شحن مجاني وتنتقل مباشرة للتجهيز.",
      },
      review: {
        title: "راجع طلبك",
        shippingTo: "الشحن",
        payment: "الدفع",
        giftPackaging: "تغليف هدية",
        subtotal: "الإجمالي الفرعي",
        shipping: "الشحن",
        total: "الإجمالي",
      },
      buttons: {
        toPayment: "تابع إلى الدفع",
        toReview: "راجع الطلب",
        placeOrder: "نفذ الطلب",
        placingOrder: "جارٍ تنفيذ الطلب...",
      },
      success: {
        completingOrder: "جاري إتمام طلبك...",
      },
      errors: {
        emptyCart: "السلة فارغة. أضف منتجات قبل الدفع.",
        shippingSave:
          "تعذر حفظ بيانات الشحن الآن، لكن يمكنك المتابعة والمحاولة مرة أخرى عند تنفيذ الطلب.",
        paymentSession:
          "تعذر تجهيز وسيلة الدفع الآن، لكن صفحة المراجعة ما زالت متاحة.",
        placementFailed:
          "لم يكتمل تنفيذ الطلب مع النظام الخلفي، لكن تم حفظ بياناتك محلياً.",
        email: "البريد الإلكتروني مطلوب.",
        firstName: "الاسم الأول مطلوب.",
        lastName: "اسم العائلة مطلوب.",
        addressLine: "العنوان مطلوب.",
        governorate: "اختر المحافظة.",
        phone: "أدخل رقم هاتف صحيح.",
      },
    },
    order: {
      title: "تم تأكيد الطلب",
      description: "شكراً لك. تم استلام طلبك والخطوات التالية واضحة بالأسفل.",
      codNote:
        "إذا اخترت الدفع عند الاستلام، سنرسل رسالة واتساب للتأكيد خلال ساعتين قبل الإرسال.",
      details: "تفاصيل الطلب",
      items: "القطع",
      payment: "الدفع",
      shipping: "الشحن",
      giftPackaging: "تغليف هدية",
      total: "الإجمالي",
      deliveryArea: "منطقة التوصيل",
      phone: "الهاتف",
      snapshotTitle: "ماذا يحدث بعد ذلك",
      snapshotBody:
        "سنؤكد نافذة التوصيل، ونرسل التتبع عند خروج الشحنة، ونجعل الاستبدال سهلاً إذا احتاج المقاس تعديلاً.",
    },
    sizeGuide: {
      title: "دليل المقاسات",
      description:
        "قِس على الجدول بالأسفل، ثم استخدم بيانات الموديل ومساعدة واتساب إذا كنت بين مقاسين.",
      fitTip: "تحتاج ترشيحاً؟ ابعت الطول والوزن على واتساب وسنقترح المقاس الأنسب.",
      howToMeasureTitle: "طريقة قراءة الجدول",
      howToMeasureBody:
        "الصدر يُقاس حول أعرض نقطة. الطول من خط الكتف حتى الذيل. الكتف من خياطة إلى خياطة.",
    },
    gifts: {
      title: "هدايا HORO",
      description:
        "الإهداء هنا استخدام أساسي للعلامة وليس إضافة جانبية. التغليف، بطاقة الفنان، ووضوح التوصيل لازم يخلوا القطعة جاهزة للتسليم.",
      standardOrder: "الطلب القياسي",
      standardBody:
        "Mailer مطفي أو صلب، ورق تغليف، ستيكر ختم، بطاقة فنان، وإرشادات عناية/استبدال بالعربية.",
      giftUpgrade: "ترقية هدية",
      giftUpgradeBody:
        "صندوق هدية صلب، عرض داخلي مرتب، وتاج هدية يبدو جاهزاً للتسليم فوراً.",
      giftCriteria: "متى تبدو هدية فعلاً",
      giftCriteriaBody: "عندما يكون المقاس واضحاً، والتوصيل موثوقاً، والسعر النهائي شاملاً كل الرسوم.",
    },
    artists: {
      title: "الأرشيف",
      description: "تعرّف على المتعاونين الذين تشكّل رسوماتهم كل قطعة من HORO.",
      emptyTitle: "سيتم تحديث الأرشيف قريباً",
      emptyBody:
        "يتم تجهيز تعاونات جديدة الآن. كل قطعة حية ستربط بأصلها في الأرشيف الخاصة بها.",
    },
    stories: {
      title: "القصص",
      description: "قصص الفنانين، وسياق المجموعات، والتفكير وراء كل إطلاق.",
      emptyTitle: "ستظهر القصص هنا قريباً",
      emptyBody:
        "عند نشر القصص التحريرية، ستربط هذه المساحة بين الرسم والقطعة والمناسبة التي صنعت من أجلها.",
    },
    account: {
      title: "الحساب",
      description:
        "راجع آخر لقطة محلية لطلبك، ووعود الخدمة، وأسرع الطرق للرجوع إلى الدعم.",
      servicePromise: "وعد الخدمة",
      latestOrder: "آخر طلب",
      viewOrderDetails: "عرض تفاصيل الطلب",
      noOrder: "لا يوجد طلب مكتمل محفوظ محلياً بعد. سيظهر طلبك القادم هنا تلقائياً.",
      viewOrders: "عرض الطلبات",
      ordersTitle: "الطلبات",
      ordersDescription: "يتم حفظ لقطات الدفع الأخيرة محلياً إلى أن يتم ربط تسجيل الحساب الكامل.",
      promiseItems: [
        "واجهة عربية أولاً مع دعم إنجليزي واضح في مسارات التسوق الأساسية.",
        "دعم واتساب للمقاسات، وتأكيد COD، وتحديثات التوصيل.",
        "الاستبدال متاح خلال 14 يوم من الاستلام.",
      ],
    },
    policies: {
      exchangeTitle: "الاستبدال والاسترجاع",
      exchangeLines: [
        "نافذة استبدال خلال 14 يوم من تاريخ الاستلام.",
        "أرسل صورة التيكت والمقاس المطلوب لبدء الاستبدال.",
        "استبدالات القاهرة/الجيزة تشمل دعم الاستلام. باقي المحافظات تشحن إلى HORO.",
        "عيوب الطباعة أو القماش تحصل على استبدال كامل مع برنت اعتذار فني.",
      ],
      shippingTitle: "الشحن",
      privacyTitle: "الخصوصية",
      privacyBody:
        "نستخدم بياناتك لمعالجة الطلبات، وإرسال تأكيدات واتساب، وتحسين الخدمة. نحن لا نبيع بياناتك.",
      privacyContact: "لأسئلة الخصوصية",
    },
    footer: {
      brand: "العلامة",
      shop: "تسوق",
      customerService: "خدمة العملاء",
      aboutHoro: "عن HORO",
      newArrivals: "جديد",
      themes: "الفِكَر",
      limitedEditions: "إصدارات محدودة",
      giftSets: "طقم هدايا",
      exchangePolicy: "سياسة الاستبدال",
      shippingDelivery: "الشحن والتوصيل",
      paymentMethods: "وسائل الدفع",
      faq: "الأسئلة الشائعة",
      orderTracking: "تتبع الطلب",
      ourStory: "قصتنا",
      contact: "تواصل",
      terms: "الشروط",
      registration: "سجل تجاري",
      taxRegistration: "البطاقة الضريبية",
    },
    home: {
      seasonalMoment: {
        cta: "تسوق الهدايا",
      },
      continueBrowsing: {
        title: "تابع التصفح",
        kicker: "اكمل تصفحك",
      },
    },
    collections: {
      title: "المجموعات",
      description:
        "قصص منسقة تتحرك من الفكرة إلى الفنان إلى القطعة، مع تجربة إهداء وثقة مدمجة في رحلة الشراء.",
      empty: "لا توجد قطع جاهزة للإطلاق في هذه المجموعة بعد.",
      pendingNote: "قد تكون بعض القطع ظاهرة في سياق القصة بينما لا تزال متطلبات الإثبات قيد الاكتمال.",
    },
  },
} as const;

export function getStorefrontCopy(locale: StorefrontLocale) {
  return storefrontCopy[locale];
}
